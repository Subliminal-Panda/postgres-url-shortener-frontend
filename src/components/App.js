import React, { Component } from 'react';
import Home from './Home';
import RouteAway from './RouteAway';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes,
  Route } from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:slug' element={<RouteAway />}/>
          </Routes>
        </Router>
      </div>
    );
  }
}
