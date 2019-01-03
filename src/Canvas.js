import React, { Component } from 'react'
import './Canvas.css'


class Canvas extends Component {
  constructor() {
    super()
    this.state = { drawing: false }
  }

  getContext() {
    return this.refs.canvas.getContext('2d')
  }

  startDrawing(x, y) {
    this.setState({ drawing: true })
    const ctx = this.getContext()
    ctx.moveTo(x, y)
  }

  draw(x, y) {
    if (!this.state.drawing) {
      return;
    }
    const ctx = this.getContext()
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.strokeStyle = "#555"
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  endDrawing() {
    this.setState({ drawing: false })
  }

  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          id="input-canvas"
          width="280"
          height="280"
          onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseUp={() => this.endDrawing()}
          onMouseLeave={() => this.endDrawing()}
          onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        />
        <canvas
          id="input-canvas-scaled"
          width="28"
          height="28"
        />
      </div>
    )
  }
}
export default Canvas;
