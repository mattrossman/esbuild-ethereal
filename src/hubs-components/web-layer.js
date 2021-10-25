import { WebLayer3D } from "ethereal"

/**
 * Creates an HTMLElement `layerEl` and renders it with Ethereal as `layer`
 */
AFRAME.registerComponent("web-layer", {
  init: function () {
    this.layerEl = document.createElement("div")
    this.layerEl.style.display = "inline-block"

    // Root element to mount components into
    this.rootEl = document.createElement("div")
    this.layerEl.appendChild(this.rootEl)

    // Stylesheet
    const linkEl = document.createElement("link")
    linkEl.rel = "stylesheet"
    linkEl.href = new URL("./index.css", import.meta.url)
    this.layerEl.appendChild(linkEl)

    this.layer = new WebLayer3D(this.layerEl, { textureEncoding: THREE.sRGBEncoding })
    this.layer.scale.setScalar(10)
    this.el.setObject3D("webLayer3D", this.layer)
  },
  tick: function () {
    this.layer.update()
  },
})
