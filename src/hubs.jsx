import "./hubs-components/counter"
import "./hubs-components/excalidraw"
import "./hubs-components/trello-board"

const el = document.createElement("a-entity")
APP.scene.appendChild(el)
el.setAttribute("trello-board", { boardId: "612d1d5d76abff8a743892e3" })
el.object3D.position.y = 1.5

console.log("Custom script running")
window.el = el
