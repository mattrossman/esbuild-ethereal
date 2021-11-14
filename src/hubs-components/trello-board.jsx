import { render } from "react-dom"
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
    this.webLayerComponent = this.el.components["web-layer"]
    const layer = this.webLayerComponent.layer
    this.layer = layer
    render(<Trello boardId={this.data.boardId} />, this.webLayerComponent.rootEl)

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
    this.dragOffset = new THREE.Vector3()

    // Set up handlers for those events we enabled earlier
    this.el.object3D.addEventListener("holdable-button-down", (cursor) => {
      cursorControllers.forEach((cursorController) => {
        if (cursorController.enabled) {
          const hit = layer.hitTest(cursorController.raycaster.ray)
          if (hit) {
            this.dragLayer = hit.layer
            // hit.target contains the associated dragged DOM element
            this.dragCursor = cursor.object3D

            // Get cursor position in local layer space
            cursorLocalPos.copy(this.dragCursor.position)
            layer.worldToLocal(cursorLocalPos)

            this.dragOffset.copy(this.dragLayer.position).sub(cursorLocalPos)
          }
        }
      })
    })
    this.el.object3D.addEventListener("holdable-button-up", () => {
      this.dragLayer = null
    })
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
