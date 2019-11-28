import { WIDTH } from './Parameters'

const THREE = require('three')

const robotTexture = require('../../assets/experiments/robot-texture.png')

const INITIAL_HEIGHT = WIDTH

export default class Ballistic {
  constructor (scene, x, z) {
    this.scene = scene
    this.x = x
    this.z = z

    const ballisticGeom = new THREE.CylinderGeometry(3, 0.2, 15, 10)

    const texture = new THREE.TextureLoader().load(robotTexture)
    texture.repeat.set(10, 10)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    const surfaceMaterial = new THREE.MeshPhongMaterial({
      bumpMap: texture,
      bumpScale: 1.0,
      color: 0xcccccc,
      reflectivity: 0.2,
      specular: 0xCCCCCC,
    })

    this.mesh = new THREE.Mesh(ballisticGeom, surfaceMaterial)
    this.mesh.position.y = this.y = INITIAL_HEIGHT
    this.mesh.position.x = x
    this.mesh.position.z = z
    this.mesh.castShadow = true

    this.scene.add(this.mesh)

    this.dy = - 2 // initial negative velocity

    this.shouldBeDeleted = false
  }

  update() {
    this.y = this.y + this.dy
    this.mesh.position.y = this.y
    this.dy = this.dy - 0.01

    if(this.y < - 15) {
      this.scene.remove(this.mesh)
      this.shouldBeDeleted = true
    }
  }
}
