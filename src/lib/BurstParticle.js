import Gradients from './Gradients'
import uuid from 'uuid'

class BurstParticle {
  constructor (initialX, initialY, gradientName) {
    this.initialX = initialX
    this.initialY = initialY + 10
    this.gradientName = gradientName
    this.uuid = uuid()

    this.reset()
  }

  update () {
    const gradients = Gradients.gradients()
    const maxAge = this.age < 256 ? this.age : 256
    this.color = gradients[this.gradientName][maxAge]

    this.age++

    this.x = this.x + this.dx
    this.y = this.y + this.dy

    this.dy = this.dy + 0.1
  }

  reset () {
    this.age = 0

    this.x = this.initialX
    this.y = this.initialY

    // choose angle of particle in a circle
    const angle = 2.0 * Math.PI * Math.random()
    this.dx = 5.0 * Math.cos(angle) * Math.random()
    this.dy = 5.0 * Math.sin(angle) * Math.random()
  }

  render (drawingContext) {
    drawingContext.moveTo(this.x, this.y)
    drawingContext.lineTo(this.x, this.y + 1)
    drawingContext.stroke()

    drawingContext.beginPath()
    drawingContext.arc(this.x, this.y, 1, 0, 2 * Math.PI, false)
    drawingContext.fillStyle = this.color
    drawingContext.fill()
    drawingContext.lineWidth = 0
    drawingContext.strokeStyle = this.color
    drawingContext.stroke()
  }
}

export default BurstParticle
