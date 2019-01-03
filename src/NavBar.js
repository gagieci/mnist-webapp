import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


class NavBar extends Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            MNIST WebApp
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar
