import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactTooltip from 'react-tooltip'

import * as Mandelbrot from '../../lib/mandelbrot/utilities'
import Gradients from '../../lib/Gradients'

const DEBUG = false
const MAX_ITERATIONS = 100

export default function MandelbrotScreen () {
  const [array, setArray] = useState()
  const [point, setPoint] = useState()
  const [gradient, setGradient] = useState('incandescent')

  const divisor = (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth
  const calculateXPosition = xi => (xi / divisor) * 4 - 3.5
  const calculateYPosition = yi => -(yi / divisor) * 4 + 2

  useEffect(() => {

    const width = window.innerWidth
    const height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight // header

    setTimeout(() => {
      console.time('calculate')
      const temp = []
      for (let xi = 0; xi < width; xi++) {
        const line = []
        for (let yi = 0; yi < height; yi++) {
          // calculate position
          const x = calculateXPosition(xi)
          const y = calculateYPosition(yi)
          line.push(Mandelbrot.iterate(x, y, MAX_ITERATIONS))
        }
        temp.push(line)
      }
      setArray(temp)
      console.timeEnd('calculate')
    })
  }, [])

  useEffect(() => {
    if (!array) return
    const width = window.innerWidth
    const height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight // header

    const canvas = document.getElementById('mainCanvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const drawingContext = canvas.getContext('2d')
    drawingContext.globalCompositeOperation = 'screen'

    // clear the screen
    drawingContext.clearRect(0, 0, width, height)

    console.time('draw')
    const colors = Gradients.gradients()[gradient]
    for (let xi = 0; xi < width; xi++) {
      for (let yi = 0; yi < height; yi++) {
        const iterations = array[xi][yi]
        drawingContext.fillStyle = colors[iterations * 6]
        if (iterations < 0) drawingContext.fillStyle = 'black'
        drawingContext.fillRect(xi, yi, 1, 1)
      }
    }
    console.timeEnd('draw')
  }, [array, gradient])

  if (!array) return (<div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress color='inherit' size='5em' variant="indeterminate"/>
  </div>)
  return (<div>
    <div style={{ position: 'fixed', top: 75, right: 50 }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={gradient}
        onChange={selected => setGradient(selected.target.value)}>
        {Object.keys(Gradients.gradients()).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
      </Select>
    </div>
    <div style={{ position: 'fixed', left: 25, bottom: 50, color: 'yellow' }}>
      <p data-tip='React-tooltip'>Info</p>
      <ReactTooltip place='right' type='dark' effect='solid'><p>This experiment generates a visual solution for the
        Mandelbrot set. Benoit Mandelbrot, a French mathematician, discovered the set in 1980 while using IBM computers
        to visualize fractal images.</p>
        <p>Complex numbers in the Mandelbrot set can be determined by a using the following recurrence relation
          Z<sub>n+1</sub> = Z<sub>n</sub><sup>2</sup> + c. Where (Z<sub>0</sub>) = (c) is a complex number. Successive
          iterations are either bounded (part of the Mandelbrot set) or unbounded. The black area in the middle
          represents numbers that are part of the set, while the colored areas are related to the iterations before a
          number is expected to grow towards infinity. The y-axis represents the imaginary part, while the x-axis
          represents the real part of a number.</p>
      </ReactTooltip>
    </div>
    <canvas id='mainCanvas' onMouseMove={event => {
      const x = calculateXPosition(event.clientX)
      const y = calculateYPosition(event.clientY)
      setPoint({ ratioX: x, ratioY: y, screenX: event.clientX, screenY: event.clientY })
    }}/>
    {(DEBUG === true) ? <div
      style={{ position: 'fixed', right: 25, bottom: 50, color: 'yellow' }}>{JSON.stringify(point)}</div> : null}
  </div>)
}