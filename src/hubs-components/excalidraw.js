import * as Excalidraw from "@/ignore/excalidraw-hubs"

AFRAME.registerComponent("excalidraw", {
  schema: {
    room: { type: "string" },
  },
  init: function () {
    this.root = document.createElement("div")
    this.root.style.position = "absolute"
    this.root.style.width = 1024 + "px"
    this.root.style.height = 1024 + "px"
    this.root.style.zIndex = -1 // Hide in background
    document.body.appendChild(this.root)

    const [roomId, roomKey] = this.data.room.split(",")
    Excalidraw.mount(this.root, { roomId, roomKey })
  },
  tryInitCanvas: function () {
    const canvas = this.root.querySelector("canvas")
    if (canvas) {
      this.texture = new THREE.CanvasTexture(canvas)
      const geometry = new THREE.PlaneBufferGeometry()
      const material = new THREE.MeshBasicMaterial({
        map: this.texture,
        side: THREE.DoubleSide,
      })
      this.mesh = new THREE.Mesh(geometry, material)

      this.el.setObject3D("excalidraw", this.mesh)
      this.canvas = canvas

      setInterval(() => {
        this.texture.needsUpdate = true
      }, 10)
    }
  },
  tick: function () {
    if (!this.texture) {
      this.tryInitCanvas()
    }
  },
})

AFRAME.GLTFModelPlus.registerComponent("excalidraw", "excalidraw")
