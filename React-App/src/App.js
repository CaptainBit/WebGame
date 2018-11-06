import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Css/App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import About from './Component/Shared/About.js';
import Login from './Component/Shared/Login.js';
import SignUp from './Component/Shared/SignUp.js';

class App extends Component {
  state = {
    anchorEl: null,
    appBarColor: 'white',
    menuColor: 'black'
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const options = this.state;

    return (
      <div className="App">
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon
                  aria-owns={options.anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}       
                /> 
                <Menu
                  anchorEl={options.anchorEl}
                  open={Boolean(options.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><Link style={{ color: options.menuColor }} to="/About">About</Link></MenuItem>
                </Menu>
              </IconButton>
              <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                Titre Super Cool
              </Typography>
              <Button color="inherit"><Link style={{ color: options.appBarColor }} to="/">Login</Link></Button>
              <Button color="inherit"><Link style={{ color: options.appBarColor }} to="/SignUp">SignUp</Link></Button>
            </Toolbar>
          </AppBar>
        </div>

        <body>
          <div>
            <Switch>
              <Route exact path="/"  component={Login} />
              <Route path="/About" component={About} />
              <Route path="/SignUp" component={SignUp} />
              <Redirect to="/" />
            </Switch>
          </div>
        </body> 
        
      </div>
    );
  }
}

export default App;