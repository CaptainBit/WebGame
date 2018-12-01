import React, { Component } from 'react';
import { Typography, Button, withStyles, TextField, Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import AlertDialog from '../Shared/AlertDialog';

const styles = theme => ({
  card: {
    maxWidth: 350,
  },
});


class SignUp extends Component {
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
 
  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }
  handleSubmit = event =>
  {
      event.preventDefault();
      fetch('http://localhost:8080/WebServices/webresources/Player/CreateAccount?userName='+ this.state.userName+'&password='+ this.state.password).then(result=> result.json())
      .then(data => this.handleClickOpenAlert("Alerte", data.status)); 
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="SignUp">
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography variant="h6" color="inherit">
              Créer un compte
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
                    Créer
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
