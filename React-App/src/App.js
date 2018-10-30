import React, { Component } from 'react';

import { Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

import Route from "./Nav/Route";

import Login from './Component/Login';

import './Css/App.css';
class App extends Component {

  render() {
    return (
      <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Connection</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
      <Route/>
    </div>
    );
  }
}

export default withRouter(App);
