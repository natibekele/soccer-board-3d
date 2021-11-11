// import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial({ color: 0xff0011 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


function animate() {
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	
	
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()

function handleResize () {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	renderer.setSize(sizes.width, sizes.height)
	camera.aspect= sizes.width/sizes.height

	camera.updateProjectionMatrix()
}

if(window) window.addEventListener('resize', handleResize)
