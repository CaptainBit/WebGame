

import React, { Component } from 'react';
import logo from './img/bullet.jpg';
import './Css/App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import About from './Component/About.js';
import Login from './Component/Login.js';

class App extends Component {
  render() {
    return (
        <div className="App">
        <div className="menu">
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/about">About</Link> </li>
            </ul>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={Login} />
            <Route path="/about" component={About} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
);
  }
}

export default App;