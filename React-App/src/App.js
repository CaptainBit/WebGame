import React, { Component } from 'react';

import {AppBar, Toolbar, Typography, Drawer, List, Divider, IconButton, Button, withStyles, CssBaseline, 
  ListItemText, ListItemIcon, ListItem} from '@material-ui/core';

import {AccountCircle,RestaurantMenu, FlashOn, People, Security, Menu, ChevronRight,
  ChevronLeft} from '@material-ui/icons';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import About from './Component/Shared/About.js';
import Login from './Component/Shared/Login.js';
import SignUp from './Component/Shared/SignUp.js';

import ListArme from  './Component/Joueur/ListArme';
import ListArmure from  './Component/Joueur/ListArmure';
import ListRessource from  './Component/Joueur/ListRessource';
import ListSoldat from  './Component/Joueur/ListSoldat';
import Profil from  './Component/Joueur/Profil';

// TODO Style dans une autre page

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  appBarColor: {
    color: 'white'
  }
});

class App extends Component {
  state = {
    open: false,
    UserName: "",
    Role: "",
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  LogoutMethod(){
    this.setState({ UserName: "" });
    this.setState({ Role: "" });
  }

  LoginMethod(user, role){
    this.setState({ UserName: user });
    this.setState({ Role: role });
  }

  render() {
    const { classes, theme } = this.props;

    const LoginComponent = (props) => {
      return (
        <Login 
        LoginMethod={this.LoginMethod.bind(this)}
          {...props}
        />
      );
    }

    let DrawerList;
    let MenuOptions;

    if(this.state.UserName !== ""){
      MenuOptions =
        <div>
          <Button component={Link} color="inherit" to="/About">À propos du jeu</Button>
          <Button color="inherit" onClick={this.LogoutMethod.bind(this)}>Se déconnecter</Button>
        </div>
    } else{
      MenuOptions =
        <div>
          <Button component={Link} color="inherit" to="/About">À propos du jeu</Button>
          <Button component={Link} color="inherit" to="/">Connexion</Button>
          <Button component={Link} color="inherit" to="/SignUp">Créer un compte</Button>
        </div>
    }

    if(this.state.Role === "Joueur"){
      DrawerList =
        <List>
          <ListItem button component={Link} to="/Profil">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem>
          <ListItem button component={Link} to="/ListSoldat">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Armée" />
          </ListItem>
          <ListItem button component={Link} to="/ListArme">
            <ListItemIcon>
              <FlashOn />
            </ListItemIcon>
            <ListItemText primary="Armes" />
          </ListItem>
          <ListItem button component={Link} to="/ListArmure">
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Armures" />
          </ListItem>
          <ListItem button component={Link} to="/ListRessource">
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Ressources" />
          </ListItem>
        </List>
    } else if(this.state.Role === "Admin"){
      DrawerList =
        <List>
          <ListItem button component={Link} to="/Profil">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Gérer les utilisateurs" />
          </ListItem>
          <ListItem button component={Link} to="/ListSoldat">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Gérer les types de soldats" />
          </ListItem>
          <ListItem button component={Link} to="/ListArme">
            <ListItemIcon>
              <FlashOn />
            </ListItemIcon>
            <ListItemText primary="Gérer les types d'armes" />
          </ListItem>
          <ListItem button component={Link} to="/ListArmure">
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Armures" />
          </ListItem>
          <ListItem button component={Link} to="/ListRessource">
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Gérer les territoires" />
          </ListItem>
        </List>
    }


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
            {/* login ou logout selon le rôle */}
            {MenuOptions}
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
            <Typography variant="h6" color="inherit">
              Choisir un onglet
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          {/* Menu selon le rôle */}
          {DrawerList}
        </Drawer>
        </div>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
              <Route exact path="/"  component={LoginComponent} />
              <Route path="/About" component={About} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/ListArme" component={ListArme} />
              <Route path="/ListArmure" component={ListArmure} />
              <Route path="/ListRessource" component={ListRessource} />
              <Route path="/ListSoldat" component={ListSoldat} />
              <Route path="/Profil" component={Profil} />
              <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);