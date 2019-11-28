import Gradients from './Gradients'
import uuid from 'uuid'

class FireworkJetParticle {
  constructor (initialX, initialY) {
    this.initialX = initialX
    this.initialY = initialY + 10
    this.uuid = uuid()

    this.reset()
  }

  getColor () {
    const num = parseInt(256.0 - 100.0 * Math.random())
    return num
  }

  update () {
    this.x = this.x + this.dx
    this.y = this.y + this.dy

    this.dy = this.dy + 0.2
  }

  reset () {
    this.x = this.initialX
    this.y = this.initialY

    this.dx = Math.random() * 0.5 - 0.25
    this.dy = 0.1 * Math.random()

    this.color = Gradients.gradients().incandescent[this.getColor()]
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

export default FireworkJetParticle
