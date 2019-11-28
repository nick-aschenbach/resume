const THREE = require('three')

const dirtImage = require('../../assets/experiments/dirt.jpg')

export default class Ballistic {
  constructor (scene, x, y, z) {
    this.scene = scene
    this.x = x
    this.y = y
    this.z = z

    this.initialY = y
    this.opacity = 1.0

    let ballisticGeom
    this.radius = Math.random() * 3 + 3
    let type = parseInt(Math.random() * 3)
    switch (type) {
      case 0:
        ballisticGeom = new THREE.TetrahedronGeometry(this.radius)
        break
      case 1:
        ballisticGeom = new THREE.DodecahedronGeometry(this.radius)
        break
      default:
        ballisticGeom = new THREE.BoxGeometry(this.radius)
    }

    const texture = new THREE.TextureLoader().load(dirtImage)
    texture.repeat.set(10, 10)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    this.surfaceMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0x7a624e,
      reflectivity: 0.2
    })

    this.mesh = new THREE.Mesh(ballisticGeom, this.surfaceMaterial)
    this.mesh.position.x = x
    this.mesh.position.z = z
    this.mesh.castShadow = true

    this.scene.add(this.mesh)

    this.dy = 2 // initial upward velocity
    this.dx = Math.random() - 0.5
    this.dz = Math.random() - 0.5

    this.thetaX = (Math.random() - 0.5) * 0.1
    this.thetaY = (Math.random() - 0.5) * 0.1
    this.thetaZ = (Math.random() - 0.5) * 0.1

    this.shouldBeDeleted = false
  }

  update () {
    this.x = this.x + this.dx
    this.y = this.y + this.dy
    this.z = this.z + this.dz

    this.opacity = this.opacity * 0.99
    if (this.opacity < 0) this.opacity = 0

    this.mesh.position.x = this.x
    this.mesh.position.y = this.y
    if (this.mesh.position.y < 0 && this.dy < 0) {
      this.mesh.position.y = this.radius
      this.surfaceMaterial.transparent = true
      this.surfaceMaterial.opacity = this.opacity

      this.dx = this.dx * .99
      this.dz = this.dz * .99
    }

    this.mesh.position.z = this.z

    this.mesh.rotateX(this.thetaX)
    this.mesh.rotateY(this.thetaY)
    this.mesh.rotateZ(this.thetaZ)

    this.dy = this.dy - 0.05

    if (this.y < (this.initialY - 200) && this.dy < 0) {
      this.scene.remove(this.mesh)
      this.shouldBeDeleted = true
    }
  }
}