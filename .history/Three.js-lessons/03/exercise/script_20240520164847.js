import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') //you are sending this to the renderer

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1) 
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height:600
} //reusing these valuses for the camera aspect ratio and the renderer size

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // field of view & aspect ratio
scene.add(camera) //may cause bugs

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera) // we ask the renderer to take a photo of the scene from the cameras point of view