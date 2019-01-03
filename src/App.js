import React, { Component } from 'react'
import NavBar from './NavBar'
import MNIST from './MNIST'


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <MNIST />
      </div>
    );
  }
}

export default App
