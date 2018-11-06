import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
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
    /*event.preventDefault();
    fetch('/Services/ConnectionConnection?userName=' + this.state.userName+'&password='+ this.state.password).then(result=> {
      
    }); */
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="Login">
        {/* <label id>Login</label> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form onSubmit={this.handleSubmit} className={classes.container}>

          <TextField
            id="userName"
            type="text"
            label="Name"
            value={this.state.userName}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="password"
            type="password"
            label="Name"
            value={this.state.password}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
          />
          
          <Button 
          type="submit"
          variant="contained" 
          color="primary" 
          disabled={!this.validateForm()}
          >
            Log in
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
