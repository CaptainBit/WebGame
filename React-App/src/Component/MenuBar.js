import React, { Component } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Button, Divider, IconButton, List, CssBaseline, Drawer, ListItemIcon, ListItemText, ListItem , Toolbar, AppBar, Typography, withStyles } from '@material-ui/core';
import {Menu, Inbox,ChevronRight,ChevronLeft } from '@material-ui/icons';

import {Route, Link, Switch, Redirect } from 'react-router-dom';
  
import About from './Shared/About.js';
import Login from './Shared/Login.js';
import SignUp from './Shared/SignUp.js';

import styles from './MenuStyled.js';

import '../Css/App.css';

class MenuBar extends Component {
    state = {
      open: false,
    };
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };
    
    render() {
      const { classes, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <Menu />
              </IconButton>
              <Typography style={{ flex: 1 }} variant="h6" color="inherit" noWrap>
              Clash Territoire
              </Typography>
              <Button component={Link} color="inherit" to="/">Login</Button>
              <Button component={Link} color="inherit" to="/SignUp">SignUp</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>
            <Divider />
            {/* TODO list dynamic */}
            <List>
              <ListItem  button component={Link} to="/About">
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Armée" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Armes" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Armures" />
              </ListItem>
                <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Ressources" />
              </ListItem>
            </List>
          </Drawer>
          </div>
        <MenuBar>
        </MenuBar>
  
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/"  component={Login} />
                <Route path="/About" component={About} />
                <Route path="/SignUp" component={SignUp} />
                <Redirect to="/" />
            </Switch>
          </main>
        </div>
      );
    }
  }
  
  MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
 export default withStyles(styles, { withTheme: true })(MenuBar);