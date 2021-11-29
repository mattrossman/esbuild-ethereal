import "./hubs-components/counter"
import "./hubs-components/excalidraw"
import "./hubs-components/trello-board"
import "./hubs-components/snapshot"
import "./hubs-components/single-action-button"
import "./hubs-components/presence-notifications"
import "./hubs-components/text-input"

console.log("Custom script running")

const el = document.createElement("a-entity")
el.setAttribute("text-input", "")
el.object3D.position.y = 1.5

APP.scene.appendChild(el)
