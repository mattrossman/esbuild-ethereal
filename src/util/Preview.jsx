import { useRef, useState, useLayoutEffect } from "react"
import { render } from "react-dom"
import { WebLayer3D } from "ethereal"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { createThreeApp, loadHDRI } from "./three.js"

const hdriURL = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/empty_warehouse_01_1k.hdr"

export function PreviewSplit({ stylesheet, children }) {
  return (
    <div class="h-screen w-screen grid auto-rows-fr auto-cols-fr grid-flow-row lg:grid-flow-col">
      <div class="grid place-content-center bg-gradient-to-br from-white to-gray-100">{children}</div>
      <PreviewEthereal stylesheet={stylesheet}>{children}</PreviewEthereal>
    </div>
  )
}

export function PreviewEthereal({ stylesheet, children }) {
  // Root element that Three's <canvas> will be placed in
  const root = useRef()

  // Set up Ethereal container element
  const [layerEl] = useState(() => {
    const layerEl = document.createElement("div")
    layerEl.setAttribute("style", "display: inline-block")
    layerEl.setAttribute("xr-pixel-ratio", 2)
    const linkEl = document.createElement("link")
    return layerEl
  })

  // Re-render the Ethereal element when props change
  useLayoutEffect(() => {
    render(children, layerEl)
  }, [children])

  // Set up Three.js once on init
  useLayoutEffect(() => {
    createThreeApp(
      {
        async init() {
          this.scene.background = new THREE.Color("red")
          this.camera.position.set(0, 0, 3)

          // OrbitControls
          this.controls = new OrbitControls(this.camera, this.renderer.domElement)
          this.controls.enableDamping = true

          // Environment
          const envMap = await loadHDRI(hdriURL, this.renderer)
          this.scene.environment = this.scene.background = envMap

          // Layer
          this.layer = new WebLayer3D(layerEl, { textureEncoding: THREE.sRGBEncoding })
          this.layer.scale.setScalar(10)
          this.layer.interactionRays = [this.raycaster.ray]
          this.scene.add(this.layer)

          const redirectEvent = (e) => {
            const hit = this.layer.hitTest(this.raycaster.ray)
            if (hit) {
              hit.target.dispatchEvent(new e.constructor(e.type, e))
              hit.target.focus()
            }
          }
          const redirectCursorEvent = (e) => {
            redirectEvent(e)
          }
          this.renderer.domElement.addEventListener("click", redirectCursorEvent, false)
        },
        tick() {
          this.layer.update()
          this.controls.update()
        },
      },
      root.current
    )
  }, [])

  return <div ref={root} style={{ overflow: "hidden" }} />
}
