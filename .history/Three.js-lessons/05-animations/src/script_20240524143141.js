import * as THREE from 'three'
import gsap from 'gsap'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Clock
    // const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// Time
    // let time = Date.now()

// Animations
const tick = () => {
    // console.log('tick')

    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // // Time
    //     // const currentTime = Date.now()
    //     // const deltaTime = currentTime - time
    //     // time = currentTime
    //     // console.log(deltaTime)

    // // Update Objects
    // mesh.rotation.y = elapsedTime // using the time value to animate the rotation
    // mesh.position.y = Math.sin(elapsedTime)
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()