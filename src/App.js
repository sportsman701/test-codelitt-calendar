import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        {this.props.children}
      </div>
    );
  }
}

export default App;
