import React, { Component } from 'react';

import MuiThemProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import GiftsView from './GiftsView/GiftsView';


const style = {
  container: {
    width: '30%',
    margin: 20,
  },

  paper: {
    width: '100%',
    padding: 50,
    textAlign: 'center',
    display: 'inline-block'
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={style.container}>
        <MuiThemProvider>
          <Paper zDepth={2} style={style.paper}>
            <h1>BitGifts</h1>
            <GiftsView />
          </Paper>
        </MuiThemProvider>
      </div>
    );
  }
}