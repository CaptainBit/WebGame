import React, { Component } from 'react';
// import logo from '../../img/bullet.jpg';

class SignUp extends Component {
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
    return (
      <div className="SignUp">
        <label id>SignUp</label>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form onSubmit={this.handleSubmit}>
          
          <label id>Nom d'utilisateur</label>
          <input type="text"
          Id="userName"
          value={this.state.userName}
          onChange={this.handleChange}/>
        
          
          
          <label>Mot de passe</label>
          <input type="password"
          Id="password"
          value={this.state.password}
          onChange={this.handleChange}/>
          
          
          <input type="submit"
           value="SignUp"
           disabled={!this.validateForm()}/>

        </form>
      </div>
    );
  }
}

export default SignUp;