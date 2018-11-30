import React, { Component } from 'react';

import {Dialog , DialogActions , DialogContent , DialogContentText , DialogTitle , List, AppBar, Toolbar, Typography, Drawer, Divider, IconButton, Button, withStyles, CssBaseline } from '@material-ui/core';

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
import ListAdminTerritoire from  './Component/Admin/ListAdminTerritoire';
import ListAdminTypeArme from  './Component/Admin/ListAdminTypeArme';
import ListAdminTypeArmure from  './Component/Admin/ListAdminTypeArme';
import ListAdminTypeSoldat from  './Component/Admin/ListAdminTypeSoldat';

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
    openAlert: false,
    titreAlert: "Erreur",
    descriptionAlert: "Erreur",
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

  handleClickOpenAlert = (titre, description) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  LogoutMethod(){
    this.setState({ UserName: "" });
    this.setState({ Role: "" });
  }

  LoginMethod(user, role){
    this.setState({ UserName: user });
    this.setState({ Role: role });
    this.UpdateRessource();
  }

  UpdateRessource(){
    fetch('http://localhost:8080/WebServices/webresources/Player/GetRessource?userName=' + this.state.UserName)
    .then(result=> result.json()).then((result) => this.setState({
      NourritureJoueur:result.nourriture,
      EauJoueur:result.eau,
      ArgentJoueur:result.argent,
      Science:result.science
    }));
  }

  SubsRessource(Nourriture, Eau, Argent, Science){
    if(this.state.NourritureJoueur - Nourriture > 0 &&
      this.state.EauJoueur - Eau > 0 &&
      this.state.ArgentJoueur -  Argent > 0 &&
      this.state.ScienceJoueur -  Science > 0)
      {
        // this.setState({ NourritureJoueur: this.state.NourritureJoueur - Nourriture });
        // this.setState({ EauJoueur: this.state.EauJoueur- Eau });
        // this.setState({ ArgentJoueur: this.state.ArgentJoueur - Argent });
        // this.setState({ ScienceJoueur: this.state.ScienceJoueur - Science });
        return true;
      }else{
        return false;
      }
  }
  AddRessource(Nourriture, Eau, Argent, Science){
    this.setState({ NourritureJoueur: this.state.NourritureJoueur + Nourriture });
    this.setState({ EauJoueur: this.state.EauJoueur + Eau });
    this.setState({ ArgentJoueur: this.state.ArgentJoueur + Argent });
    this.setState({ ScienceJoueur: this.state.ScienceJoueur + Science });
  }

  render() {
    const { classes, theme } = this.props;

    const ListRessourceComponent = (props) => {
      return (
        <ListRessource 
        UserName={this.state.UserName}
        OpenAlert={this.handleClickOpenAlert.bind(this)}
          {...props}
        />
      );
    }
    const LoginComponent = (props) => {
      return (
        <Login 
        LoginMethod={this.LoginMethod.bind(this)}
        OpenAlert={this.handleClickOpenAlert.bind(this)}
          {...props}
        />
      );
    }

    const SignUpComponent = (props) => {
      return (
        <SignUp 
        OpenAlert={this.handleClickOpenAlert.bind(this)}
          {...props}
        />
      );
    }

    const ListArmeComponent = (props) => {
      return (
        <ListArme
        UserName ={this.state.UserName}
        SubsRessource={this.SubsRessource.bind(this)}
        AddRessource={this.AddRessource.bind(this)}
        OpenAlert={this.handleClickOpenAlert.bind(this)}
        />
      );
    }

    const ListArmureComponent = (props) => {
      return (
        <ListArmure
        UserName ={this.state.UserName}
        SubsRessource={this.SubsRessource.bind(this)}
        AddRessource={this.AddRessource.bind(this)}
        OpenAlert={this.handleClickOpenAlert.bind(this)}
        UpdateRessource={this.UpdateRessource.bind(this)}
        />
      );
    }
    const ProfilComponent = (props) =>{
      return(
      <Profil
        Account = {this.state.UserName}
        {...props}
      />
      )
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
              <Route path="/About" component={About} />
              {/*Page accessible selon le rôle */}
              {this.state.Role === "Joueur" ?
              <div>
                <Route path="/ListArme" component={ListArmeComponent} />
                <Route path="/ListArmure" component={ListArmureComponent} />
                <Route path="/ListRessource" component={ListRessourceComponent} />
                <Route path="/ListSoldat" component={ListSoldat} />
                <Route path="/Profil" component={ProfilComponent} /> 
              </div>               
              :
              this.state.Role === "Admin" ?
              <div>
                <Route path="/ListAdminJoueur" component={ListAdminJoueur} />
                <Route path="/ListAdminTerritoire" component={ListAdminTerritoire} />
                <Route path="/ListAdminTypeArme" component={ListAdminTypeArme} />
                <Route path="/ListAdminTypeArmure" component={ListAdminTypeArmure} />
                <Route path="/ListAdminTypeSoldat" component={ListAdminTypeSoldat} />
              </div>
              :
              <div>
                <Route exact path="/"  component={LoginComponent} />
                <Route path="/SignUp" component={SignUpComponent} />            
              </div>  
              }
              <Redirect to="/" />
          </Switch>
        </main>
        <Dialog
          open={this.state.openAlert}
          onClose={this.handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.titreAlert}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.descriptionAlert}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAlert} color="primary" autoFocus>
              D'accord
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);