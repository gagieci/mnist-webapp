import React, { Component } from 'react'
import { Tensor, InferenceSession } from 'onnxjs'
import Button from "@material-ui/core/Button"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Canvas from './Canvas'


class App extends Component {
  getImageTensor() {
    const ctx = document.getElementById('input-canvas').getContext('2d')

    // scaled to 28x28
    const ctxScaled = document.getElementById('input-canvas-scaled').getContext('2d')
    ctxScaled.save();
    ctxScaled.scale(28 / ctx.canvas.width, 28 / ctx.canvas.height)
    ctxScaled.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctxScaled.drawImage(document.getElementById('input-canvas'), 0, 0)
    ctxScaled.restore()

    // convert to tensor
    const imageDataScaled = ctxScaled.getImageData(0, 0, 28, 28)
    const input = new Float32Array(784);
    for (let i = 0, len = imageDataScaled.data.length; i < len; i += 4) {
        input[i / 4] = imageDataScaled.data[i + 3] / 255;
    }
    const tensor = new Tensor(input, 'float32', [1, 1, 28, 28]);
    return tensor
    }

  getAnser(outputMap) {
    const outputData = outputMap.values().next().value.data

    let answer = 0
    let maxValue = -1024
    for (let i = 0; i < 10; i += 1) {
        if (outputData[i] > maxValue) {
            maxValue = outputData[i]
            answer = i
        }
    }
    return answer
  }

  async runModel() {
    const session = new InferenceSession({ backendHint: 'webgl' })
    const modelFile = './mnist.onnx'
    await session.loadModel(modelFile)

    const inputTensor = this.getImageTensor()
    const outputMap = await session.run([inputTensor])

    const answer = this.getAnser(outputMap)
    document.getElementById('answer').innerHTML = 'The answer is ' + answer
  }

  clearCanvas() {
    const ctx = document.getElementById('input-canvas').getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.beginPath()

    const ctxScaled = document.getElementById('input-canvas-scaled').getContext('2d')
    ctxScaled.clearRect(0, 0, ctxScaled.canvas.width, ctxScaled.canvas.height)
    ctxScaled.beginPath()

    document.getElementById('answer').innerHTML = ''
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Canvas />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.runModel()}>
              Run
            </Button>
            <Button variant="contained" color="secondary" onClick={() => this.clearCanvas()}>
              Clear
            </Button>
          </CardActions>
          <CardContent>
            <Typography id='answer' variant="h5" component="h3" />
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default App
