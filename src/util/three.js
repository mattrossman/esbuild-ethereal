import * as THREE from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

export async function createThreeApp(app, root = document.body) {
  // Scene
  const scene = new THREE.Scene()

  // WebGLRenderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  // renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputEncoding = THREE.sRGBEncoding
  root.appendChild(renderer.domElement)

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  const resize = () => {
    const width = root.clientWidth
    const height = root.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  // Raycaster
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const updateRay = (nx, ny) => {
    mouse.set(nx, ny)
    raycaster.setFromCamera(mouse, camera)
  }
  updateRay(Infinity, Infinity)
  root.addEventListener(
    "mousemove",
    (e) => {
      const nx = ((e.clientX - root.offsetLeft) / root.clientWidth) * 2 - 1
      const ny = ((e.clientY - root.offsetTop) / root.clientHeight) * 2 - 1
      updateRay(nx, ny * -1)
    },
    false
  )

  // Loop
  const clock = new THREE.Clock()
  const loop = () => {
    requestAnimationFrame(loop)
    const delta = clock.getDelta()
    app.tick(clock.elapsedTime, delta)
    resize()
    renderer.render(scene, camera)
  }
  Object.assign(app, { scene, camera, renderer, clock, raycaster })
  app.init().then(loop)
}

export function loadHDRI(url, renderer) {
  return new Promise((resolve) => {
    const loader = new RGBELoader()
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    loader.load(url, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      texture.dispose()
      pmremGenerator.dispose()
      resolve(envMap)
    })
  })
}
