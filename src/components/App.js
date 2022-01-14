import React, { Component } from 'react';
import Home from './Home';
import '../styles/App.scss';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Home />
      </div>
    );
  }
}
