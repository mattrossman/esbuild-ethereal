import "./web-layer.js"

/**
 * Forwards Hubs interactions (hover, click) onto an Ethereal layer
 */
AFRAME.registerComponent("web-layer-events", {
  dependencies: ["web-layer"],
  init: function () {
    const layer = this.el.components["web-layer"].layer

    // Left and right cursor components (mouse acts as right cursor on desktop)
    const cursorControllers = [...document.querySelectorAll("[cursor-controller]")].map(
      (el) => el.components["cursor-controller"]
    )

    // Set up Ethereal's interactionRays for hover states
    layer.interactionRays = cursorControllers.map((cursorController) => cursorController.raycaster.ray)

    // These two lines tell Hubs' interaction system to pay attention to us
    this.el.classList.add("interactable")
    this.el.setAttribute("is-remote-hover-target", "")

    // This tag tells the button system to emit 'interact' events on our object
    this.el.setAttribute("tags", { singleActionButton: true })

    // Finally, we'll redirect the "interact" events as custom "click" events on the hit element
    this.el.object3D.addEventListener("interact", (e) => {
      // Look for any non-null hit across all raycasters
      cursorControllers
        .filter((cursorController) => cursorController.enabled)
        .forEach((cursorController) => {
          const hit = layer.hitTest(cursorController.raycaster.ray)
          if (hit) {
            hit.target.click()
            hit.target.focus()
            console.log(hit)
          }
        })
    })
  },
})
