import { render } from "react-dom"
import { Counter } from "@/components/Counter"

import "./web-layer"
import "./web-layer-events"

AFRAME.registerComponent("preact-counter", {
  dependencies: ["web-layer", "web-layer-events"],
  schema: {
    count: { default: 0 },
  },
  init: function () {
    this.webLayerComponent = this.el.components["web-layer"]
  },
  update: function () {
    const setState = (state) => {
      NAF.utils.takeOwnership(this.el)
      this.el.setAttribute("preact-counter", state)
    }
    render(<Counter state={this.data} setState={setState} />, this.webLayerComponent.rootEl)
    this.webLayerComponent.layer.refresh()
  },
})

AFRAME.registerComponent("networked-preact-counter", {
  init: function () {
    this.el.setAttribute("networked", {
      template: "#counter-media",
      networkId: "counter",
      owner: "scene",
    })
  },
})

AFRAME.GLTFModelPlus.registerComponent("networked-preact-counter", "networked-preact-counter")

const assets = document.querySelector("a-assets")
assets.insertAdjacentHTML(
  "beforeend",
  `
  <template id="counter-media">
    <a-entity preact-counter></a-entity>
  </template>
`
)

NAF.schemas.add({
  template: "#counter-media",
  components: [
    {
      component: "preact-counter",
      property: "count",
    },
  ],
})
