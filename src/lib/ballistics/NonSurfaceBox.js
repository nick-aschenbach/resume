import { WIDTH, DEPTH } from './Parameters'

const THREE = require('three')

const dirtImage = require('../../assets/experiments/dirt.jpg')

export default function NonSurfaceBox (scene) {
  const imgTexture = new THREE.TextureLoader().load(dirtImage)
  imgTexture.repeat.set(5, 5)
  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
  imgTexture.anisotropy = 4

  const surfaceMaterial = new THREE.MeshPhongMaterial({
    map: imgTexture,
    bumpMap: imgTexture,
    bumpScale: 0.1,
    color: 0x3C2817,
    reflectivity: 0.1,
    side: THREE.DoubleSide
  })

  // BOTTOM SURFACE
  const bottomGeom = new THREE.PlaneBufferGeometry(WIDTH, WIDTH)
  const bottomPlane = new THREE.Mesh(bottomGeom, surfaceMaterial)
  bottomGeom.computeVertexNormals()

  scene.add(bottomPlane)
  bottomPlane.rotateX(-Math.PI / 2)
  bottomPlane.translateZ(-DEPTH)

  // FRONT FACE (A)
  const backGeom = new THREE.PlaneBufferGeometry(WIDTH, DEPTH)
  const backPlane = new THREE.Mesh(backGeom, surfaceMaterial)

  scene.add(backPlane)
  // bottomPlane.rotateX(-Math.PI / 2)
  backPlane.translateZ(-WIDTH / 2)
  backPlane.translateY(-DEPTH / 2)

  // BACK FACE (C)
  const frontGeom = new THREE.PlaneBufferGeometry(WIDTH, DEPTH)
  const frontPlane = new THREE.Mesh(frontGeom, surfaceMaterial)

  scene.add(frontPlane)
  frontPlane.translateZ(WIDTH / 2)
  frontPlane.translateY(-DEPTH / 2)

  // LEFT FACE (D)
  const leftGeom = new THREE.PlaneBufferGeometry(WIDTH, DEPTH)
  const leftPlane = new THREE.Mesh(leftGeom, surfaceMaterial)

  scene.add(leftPlane)
  leftPlane.rotateY(-Math.PI / 2)
  leftPlane.translateZ(WIDTH / 2)
  leftPlane.translateY(-DEPTH / 2)

  // RIGHT FACE (B)
  const rightGeom = new THREE.PlaneBufferGeometry(WIDTH, DEPTH)
  const rightPlane = new THREE.Mesh(rightGeom, surfaceMaterial)

  scene.add(rightPlane)
  rightPlane.rotateY(-Math.PI / 2)
  rightPlane.translateZ(-WIDTH / 2)
  rightPlane.translateY(-DEPTH / 2)
}
