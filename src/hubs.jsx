import "./hubs-components/counter"
import "./hubs-components/excalidraw"
import "./hubs-components/trello-board"
import "./hubs-components/snapshot"
import "./hubs-components/single-action-button"

console.log("Custom script running")

const el = document.createElement("a-entity")
APP.scene.appendChild(el)
el.setAttribute("single-action-button", { event: "click" })
el.setAttribute("snapshot", "")
el.addEventListener("click", () => {
  console.log("click")
  const checker = getCheckerCanvas()
  el.components.snapshot.spawnSnapshot(checker).then(() => {
    console.log("snapshot spawned")
  })
})
el.setAttribute("geometry", { primitive: "box" })
el.setAttribute("material", { color: "red" })
el.object3D.position.y = 1.5
window.el = el

function getCheckerCanvas(size = 512) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = "#000"
  const c = size / 2 // Checker size
  ctx.fillRect(0, 0, c, c)
  ctx.fillRect(c, c, c, c)
  return canvas
}

// const el = document.createElement("a-entity")
// APP.scene.appendChild(el)
// el.setAttribute("trello-board", { boardId: "612d1d5d76abff8a743892e3" })
// el.object3D.position.y = 1.5
// window.el = el
