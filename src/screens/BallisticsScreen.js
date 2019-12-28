import React, { useEffect } from 'react'
import sidesAndBottom from '../lib/ballistics/NonSurfaceBox'
import { WIDTH, DEPTH } from '../lib/ballistics/Parameters'
import Ballistic from '../lib/ballistics/Ballistic'
import EjectedMaterial from '../lib/ballistics/EjectedMaterial'
import ReactTooltip from 'react-tooltip'
import {OrbitControls} from '../lib/ballistics/OrbitControls'
import * as THREE from 'three'
import * as laserImage from '../assets/experiments/laser.png'
import * as dirtImage from '../assets/experiments/dirt.jpg'

const DEBUG = false

export default function BallisticsScreen () {

  useEffect(() => {
    // Create an empty scene
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#303030')
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    document.getElementById('ballisticsTarget').appendChild(renderer.domElement)

    // TOP SURFACE
    const surfaceGeometry = new THREE.PlaneBufferGeometry(WIDTH, WIDTH, 30, 30)
    let vertices = surfaceGeometry.attributes.position.array

    console.log('30 w x 30 h segments. total vertices:', vertices.length)

    const positionAttribute = new THREE.Float32BufferAttribute(new Float32Array(vertices), 3)
    positionAttribute.setUsage(THREE.DynamicDrawUsage)
    surfaceGeometry.setAttribute('position', positionAttribute)
    surfaceGeometry.computeVertexNormals()

    const imgTexture = new THREE.TextureLoader().load(dirtImage)
    imgTexture.repeat.set(10, 10)
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
    imgTexture.anisotropy = 4

    const surfaceMaterial = new THREE.MeshPhongMaterial({
      map: imgTexture,
      color: 0x7a624e,
      reflectivity: 0.2,
      shininess: 20,
      side: THREE.DoubleSide,
    })

    const surfaceWireframeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x5d4734
    })

    const plane = new THREE.Mesh(surfaceGeometry, surfaceMaterial)
    plane.receiveShadow = true
    const plane2 = new THREE.Mesh(surfaceGeometry, surfaceWireframeMaterial)
    plane.receiveShadow = true

    plane.rotateX(-Math.PI / 2)
    plane2.rotateX(-Math.PI / 2)

    scene.add(plane)
    // scene.add(plane2)

    sidesAndBottom(scene)

    // projectile list
    let projectiles = []

    // ejected material list
    let ejectedMaterials = []

    // Create a basic perspective camera
    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, WIDTH * 4)
    camera.position.x = 3 * WIDTH / 2
    camera.position.y = 3 * WIDTH / 5
    camera.position.z = 3 * WIDTH / 2
    //
    camera.lookAt(0, 0, 0)

    const light1 = new THREE.SpotLight(0xffffff, 0.3)
    light1.castShadow = true
    light1.position.set(WIDTH / 3, WIDTH, WIDTH / 3)
    light1.lookAt(0, 0, 0)
    scene.add(light1)

    if (DEBUG) {
      const cameraHelper = new THREE.CameraHelper(light1.shadow.camera)
      scene.add(cameraHelper)
    }

    const light2 = new THREE.DirectionalLight(0xffffff, 1.0)
    light2.position.set(camera.position.x, camera.position.y, camera.position.z)
    scene.add(light2)

    const laserLight = new THREE.PointLight(0xff0000, 0.3)
    laserLight.position.set(0, 5, 0)
    scene.add(laserLight)

    scene.add(new THREE.AmbientLight(0xFFFFFF))

    let lastKnownMouseX = 0
    let lastKnownMouseZ = 0
    const controls = new OrbitControls(camera, renderer.domElement, () => {
      projectiles.push(new Ballistic(scene, lastKnownMouseX, lastKnownMouseZ))
    })
    controls.minDistance = WIDTH * 1
    controls.maxDistance = WIDTH * 3
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.0

    // laser beam
    const laserTexture = new THREE.TextureLoader().load(laserImage)
    laserTexture.repeat.set(1, 1)
    laserTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
    laserTexture.anisotropy = 4
    // laserTexture.center(0.5, 0.5)

    const laserGeom = new THREE.CylinderGeometry(1, 1, 20, 32)
    laserGeom.scale(0.5, 100, 0.5)
    const laserMaterial = new THREE.MeshPhongMaterial(
      {
        map: laserTexture,
        alphaMap: laserTexture,
        color: 0xffffff,
        specular: 0xffffff,
        specularMap: laserTexture,
        reflectivity: 1.0,
        shininess: 100
      }
    )
    const laser = new THREE.Mesh(laserGeom, laserMaterial)
    scene.add(laser)

    // Render Loop
    let requestId
    const render = function () {
      requestId = requestAnimationFrame(render)

      // fire laser from above at mouse pointer
      const mouse = new THREE.Vector2(controls.mouse.x, controls.mouse.y) // create once and reuse
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([plane])

      let pos = { x: undefined, y: undefined, z: undefined }
      document.getElementById('ballisticsTarget').style.cursor = 'pointer'

      for (let i = 0; i < intersects.length; i++) {
        document.getElementById('ballisticsTarget').style.cursor = 'none'

        const intersect = intersects[0]
        pos = intersect.point
        laser.position.x = pos.x
        laser.position.z = pos.z

        laserLight.position.x = pos.x
        laserLight.position.y = pos.y + 3
        laserLight.position.z = pos.z

        lastKnownMouseX = pos.x
        lastKnownMouseZ = pos.z
      }

      // Output debug info
      if (DEBUG) {
        const label = document.getElementById('ballisticsInfo')
        const child = label
        child.innerHTML = `Camera pos: (${camera.position.x}, ${camera.position.y}, ${camera.position.z})<br />`
        child.innerHTML += `Mouse pos: (${controls.mouse.x}, ${controls.mouse.y})<br />`
        child.innerHTML += `World pos: (${pos.x}, ${pos.y}, ${pos.z})<br />`
        // child.innerHTML += `Controls: ${JSON.stringify(controls, null, 2)}` // generates a lot of info
        child.innerHTML += `Projectile count: ${projectiles.length}`
      }

      renderer.render(scene, camera)

      // Animate scene elements
      projectiles.forEach(p => p.update())
      ejectedMaterials.forEach(e => e.update())

      // Handle collisions
      const collisionProjectiles = [...projectiles.filter(p => p.shouldBeDeleted)]
      collisionProjectiles.forEach(p => {
        for (let i = 0; i < vertices.length; i++) {
          if (i % 3 !== 0) continue // align to the x vertices

          const x = vertices[i]
          const z = -vertices[i + 1]
          const y = vertices[i + 2]

          // stay away from the walls
          if (Math.abs(x) > 145 || Math.abs(z) > 145) continue

          // Calculate the closest vertex to x, z on the mesh -- using pythagorean's theorem
          const a_squared = (p.x - x) * (p.x - x)
          const b_squared = (p.z - z) * (p.z - z)
          const c = Math.sqrt(a_squared + b_squared)

          if (c < 25) {
            if (y - 10 < -DEPTH) continue

            // Eject some material around impact point
            ejectedMaterials.push(new EjectedMaterial(scene, x, y, z))

            vertices[i + 2] = y - 10
          }
        }

        // re-assign the array of vertices
        const positionAttribute = new THREE.Float32BufferAttribute(new Float32Array(vertices), 3)
        positionAttribute.setUsage(THREE.DynamicDrawUsage)
        surfaceGeometry.setAttribute('position', positionAttribute)
        surfaceGeometry.computeVertexNormals()
      })

      // Remove projectiles
      projectiles = [...projectiles.filter(p => !p.shouldBeDeleted)]
      ejectedMaterials = [...ejectedMaterials.filter(p => !p.shouldBeDeleted)]
      controls.update()

    }

    render()

    return () => cancelAnimationFrame(requestId)
  })

  return (
    <div id='ballisticsTarget'>
      <div
        id='ballisticsInfo'
        style={{ position: 'fixed', bottom: 50, left: 25, color: 'yellow' }}>
        <p data-tip='React-tooltip'>Info</p>
        <ReactTooltip place='right' type='dark' effect='solid'>This experiment combines a few different elements. I
          modified the <code>THREE.js</code>'s <code>OrbitControls.js</code> example code to include mouse position
          relative to the window. The <code>THREE.raycaster</code> shoots a ray from the camera to the mouse to
          determine if it intersects with the ground plane. Then world coordinates are calculated. Both the ballistic
          and ejected material generate shadows under a spot light and use lightly modeled physics.
        </ReactTooltip>
      </div>
    </div>
  )
}
