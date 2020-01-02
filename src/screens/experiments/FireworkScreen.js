import React, { useEffect } from 'react'

import FireworkJetParticle from '../../lib/fireworks/FireworkJetParticle'
import BurstParticle from '../../lib/fireworks/BurstParticle'
import FireworkParticle from '../../lib/fireworks/FireworkParticle'
import Gradients from '../../lib/Gradients'
import '../../css/App.css'

const MAX_PARTICLES = 250

export default function FireworkScreen () {
  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.getElementById('mainCanvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const firework = new FireworkParticle(width / 2, height - 10)
    const particles = new Set()

    const timer = setInterval(() => {
      const drawingContext = canvas.getContext('2d')
      drawingContext.globalCompositeOperation = 'screen'

      // clear the screen
      drawingContext.clearRect(0, 0, width, height)

      // move the firework
      firework.update()
      if (firework.die) {
        const gradients = Gradients.gradients()
        const keys = Object.keys(gradients)
        const gradientName = keys[Math.floor(Math.random() * keys.length)]

        for (let i = 0; i < MAX_PARTICLES; i++) {
          particles.add(new BurstParticle(firework.x, firework.y, gradientName))
        }
      }
      firework.render(drawingContext)

      particles.add(new FireworkJetParticle(firework.x, firework.y))

      // render each particle and keep track of those that need to be cleared
      const particlesToClear = []
      particles.forEach(particle => {
        particle.update()
        particle.render(drawingContext)
        if (particle.y > height) particlesToClear.push(particle)
      })

      particlesToClear.forEach(particle => particles.delete(particle))
      if (firework.die) firework.reset()
    }, 18)

    return () => clearTimeout(timer)
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <canvas id='mainCanvas' />
      </header>
      <div style={{ position: 'fixed', left: 10, bottom: 10 }}>
        <a href='http://nick-aschenbach.github.io/blog/2014/07/18/generating-code-from-color-gradients'>See related
          blog post
        </a>
      </div>
    </div>
  )
}
