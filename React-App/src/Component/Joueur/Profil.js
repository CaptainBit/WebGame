import React, { Component } from 'react';
import { Typography, Button, withStyles, TextField, Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  card: {
    maxWidth: 350,
  },
});

class Profil extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userName: props.Account,
      password: ""
    };
  }

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
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="Login">
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography variant="h6" color="inherit">
              Modifier son profil
            </Typography>
            <div>
            <Typography>
              <TextField
                id= {this.state.userName}
                type="text"
                label="Nom de l'utilisateur"
                value={this.state.userName}
                onChange={this.handleChange}
                margin="normal"
              />
            </Typography>
            <Typography>
              <TextField
                id={this.state.password}
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
                    Modifier
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

Profil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profil);


