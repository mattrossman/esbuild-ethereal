import { render } from "react-dom"
import { WebLayer3D } from "ethereal"
import { io } from "socket.io-client"
import { Trello } from "@/components/Trello"
import "./web-layer"
import "./web-layer-events"

const cursorLocalPos = new THREE.Vector3()

AFRAME.registerComponent("trello-board", {
  dependencies: ["web-layer"],
  schema: {
    boardId: { type: "string" },
  },
  init: function () {
    // WebLayer3D setup
    this.webLayerComponent = this.el.components["web-layer"]
    /** @type {WebLayer3D} */
    const layer = this.webLayerComponent.layer
    this.layer = layer

    // Socket.io setup
    this.board = null
    this.socket = io(`https://cisco-trello-server.herokuapp.com/${this.data.boardId}`)
    this.socket.on("message", (board) => {
      console.log(board)
      this.board = board
      this.renderBoard(board)
    })

    // Left and right cursor components (mouse acts as right cursor on desktop)
    const cursorControllers = [...document.querySelectorAll("[cursor-controller]")].map(
      (el) => el.components["cursor-controller"]
    )

    // Set up Ethereal's interactionRays for hover states
    layer.interactionRays = cursorControllers.map((cursorController) => cursorController.raycaster.ray)

    this.el.classList.add("interactable")
    this.el.setAttribute("tags", {
      isHoldable: true,
      holdableButton: true,
    })
    this.el.setAttribute("is-remote-hover-target", "")

    this.dragLayer = null
    this.dragCursor = null
    this.dragCursorController = null
    this.dragOffset = new THREE.Vector3()

    // Set up handlers for those events we enabled earlier
    this.el.object3D.addEventListener("holdable-button-down", (cursor) => {
      cursorControllers.forEach((cursorController) => {
        if (cursorController.enabled) {
          const hit = layer.hitTest(cursorController.raycaster.ray)
          if (hit && hit.layer.element.dataset.type === "card") {
            this.dragLayer = hit.layer
            window.dragLayer = hit.layer
            this.dragCursor = cursor.object3D
            this.dragCursorController = cursorController

            // Get cursor position in local layer space
            cursorLocalPos.copy(this.dragCursor.position)
            layer.worldToLocal(cursorLocalPos)

            this.dragOffset.copy(this.dragLayer.position).sub(cursorLocalPos)
          }
        }
      })
    })
    this.el.object3D.addEventListener("holdable-button-up", () => {
      if (this.dragLayer) {
        const listLayers = [...layer.rootLayer.element.querySelectorAll('[data-type="list"]')].map(
          (el) => el.layer.contentMesh
        )
        const intersections = this.dragCursorController.raycaster.intersectObjects(listLayers)
        if (intersections.length > 0) {
          const listEl = intersections[0].object.parent.element
          const listId = listEl.dataset.id
          const cardId = this.dragLayer.element.dataset.id
          console.log(`Dropping card ${cardId} onto list ${listId}`)
          this.moveCardToList(cardId, listId)
        }
        this.dragLayer = null
      }
    })
  },
  renderBoard: function (board) {
    render(<Trello board={board} />, this.webLayerComponent.rootEl)
  },
  moveCardToList: function (cardId, listId) {
    // Re-render locally immediately
    const newList = this.board.find((list) => list.id === listId)
    for (const oldList of this.board) {
      const cardIndex = oldList.cards.findIndex((card) => card.id === cardId)
      if (cardIndex >= 0) {
        const card = oldList.cards[cardIndex]
        oldList.cards.splice(cardIndex, 1)
        newList.cards.push(card)
        this.renderBoard(this.board)
        break
      }
    }

    // Send update over network
    this.socket.emit("moveCardToList", cardId, listId)
  },
  tick: function () {
    if (this.dragLayer) {
      // Get cursor position in local layer space
      cursorLocalPos.copy(this.dragCursor.position)
      this.layer.worldToLocal(cursorLocalPos)

      // Handle layout ourselves
      this.dragLayer.position.copy(cursorLocalPos).add(this.dragOffset)
    } else {
      this.webLayerComponent.layer.update()
    }
  },
})

AFRAME.GLTFModelPlus.registerComponent("trello-board", "trello-board")
