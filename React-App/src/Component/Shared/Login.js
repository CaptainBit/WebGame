import React, { Component } from 'react';
import { Typography, Button, withStyles, TextField, Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import AlertDialog from '../Shared/AlertDialog';


const styles = theme => ({
  card: {
    maxWidth: 350,
  },
});


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      openAlert: false,
      titreAlert: "Erreur",
      descriptionAlert: "Erreur",
      itemAlert: {}
    };
  }

  handleClickOpenAlert = (titre, description, item) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description, itemAlert: item });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateConnection(data){
    if(data.status === false){
      this.handleClickOpenAlert("Alerte", "Aucun compte lié à ce mot de passe ")
    }else{
     //Role Admin ou Joueur, nourriture, argent, science
    this.props.LoginMethod( this.state.userName, data.role);
    }
  }
  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }
  handleSubmit = event =>
  {
    event.preventDefault();
    fetch('http://localhost:8080/WebServices/webresources/Player/Connect?userName='+
     this.state.userName+'&password='+ this.state.password)
    .then(result=> result.json())
    .then(data => this.validateConnection(data)); 
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="Login">
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography variant="h6" color="inherit">
              Connexion
            </Typography>
            <div>
            <Typography>
              <TextField
                id="userName"
                type="text"
                label="Nom de l'utilisateur"
                value={this.state.userName}
                onChange={this.handleChange}
                margin="normal"
              />
            </Typography>
            <Typography>
              <TextField
                id="password"
                type="password"
                label="Mot de passe"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
              />
            </Typography>
            </div>
          </CardContent>
          <CardActions>
              <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  disabled={!this.validateForm()}
                  >
                    Connexion
              </Button>
            </CardActions>
          </form>
        </Card>
        <AlertDialog
          openAlert={this.state.openAlert}
          titreAlert={this.state.titreAlert}
          descriptionAlert={this.state.descriptionAlert}
          handleCloseAlert={this.handleCloseAlert.bind(this)}
        >
        </AlertDialog>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
