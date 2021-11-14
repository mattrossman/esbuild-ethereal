import { render } from "react-dom"
import { Trello } from "@/components/Trello"
import "./web-layer"
import "./web-layer-events"

AFRAME.registerComponent("trello-board", {
  dependencies: ["web-layer"],
  schema: {
    boardId: { type: "string" },
  },
  init: function () {
    this.webLayerComponent = this.el.components["web-layer"]
    render(<Trello boardId={this.data.boardId} />, this.webLayerComponent.rootEl)
  },
})

AFRAME.GLTFModelPlus.registerComponent("trello-board", "trello-board")
