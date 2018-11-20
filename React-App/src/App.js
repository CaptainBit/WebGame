import React, { Component } from 'react';

import {List, AppBar, Toolbar, Typography, Drawer, Divider, IconButton, Button, withStyles, CssBaseline } from '@material-ui/core';

import {SettingsInputAntenna, AttachMoney, LocalDrink, Restaurant, Menu, ChevronLeft} from '@material-ui/icons';

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

import ListAdminJoueur from  './Component/Admin/ListAdminJoueur';

import DrawerListJoueur from './Component/Joueur/DrawerListJoueur';
import DrawerListAdmin from './Component/Admin/DrawerListAdmin';

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
    NourritureJoueur: 500,
    EauJoueur: 500,
    ArgentJoueur:500,
    ScienceJoueur:500
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

  UpdateRessource(Nourriture, Eau, Argent, Science){
    this.setState({ NourritureJoueur: Nourriture });
    this.setState({ EauJoueur: Eau });
    this.setState({ ArgentJoueur: Argent });
    this.setState({ ScienceJoueur: Science });
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

    let MenuOptions;
    let RessourceJoueur

    if(this.state.UserName !== ""){
      RessourceJoueur = 
      <Typography style={{ flex: 1, display: 'flex', flexWrap: 'wrap'}} variant="h6" color="inherit" noWrap>
        <div style={{ marginLeft: 10}}>
          <Restaurant /> {this.state.NourritureJoueur}    
        </div>
        <div style={{ marginLeft: 10}}>
          <LocalDrink /> {this.state.EauJoueur}     
        </div>
        <div style={{ marginLeft: 10}}>
          <AttachMoney /> {this.state.ArgentJoueur}     
        </div>
        <div style={{ marginLeft: 10}}>
          <SettingsInputAntenna /> {this.state.ScienceJoueur}
        </div>
      </Typography>
    }

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
            {RessourceJoueur}
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
          {this.state.Role === "Joueur" ?
            <DrawerListJoueur/>
            :
            this.state.Role === "Admin" ?
            <DrawerListAdmin/>
            :
            <List/>
          }
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
              <Route path="/ListAdminJoueur" component={ListAdminJoueur} />
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