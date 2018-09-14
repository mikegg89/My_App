import React, { Component } from 'react';
import './register.css';
import { ThemeProvider } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import '@material/typography/dist/mdc.typography.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/button/dist/mdc.button.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        login: true,
        user_name: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
      };

    this.toggleRegister = this.toggleRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  toggleRegister() {
    this.setState({login: false});
  }

  toggleLogin() {
    this.setState({login: true});
  }

  register() {
    let user = [];
    user.push([
      this.state.first_name,
      this.state.last_name,
      this.state.user_name,
      this.state.password,
      this.state.email
    ]);
    fetch('/api/users/register/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(results => {
      if(results) {
        this.forceUpdate();
      }
    })
    .catch(err => console.error(err))
  }

  login() {
    let user = [];
    user.push([
      this.state.user_name,
      this.state.password
    ]);
    fetch('/api/users/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(results => {
      if(results) {
        console.log(results);
      }
    })
    .catch(err => console.error(err))
  }

  render() {
    let className = "register";
    if(this.state.login) {
      className = "register login";
    }
    return(
      <div className={className}>
        <ThemeProvider options={{
          primary: '#213482',
          secondary: '#7B85AD',
          onPrimary: '#7B85AD',
          textPrimaryOnBackground: 'black'
        }}>
        {(this.state.login) ?
          ( <div className="login">
              <div className="register-title">
                <Typography use="headline4">Login</Typography>
              </div>
              <div className="register-form">
                <TextField required label="User Name" type="User-Name" onChange={({target}) => this.setState({user_name: target.value})}/>
                <TextField required label="Password" type="Password" onChange={({target}) => this.setState({password: target.value})}/>
                <Button theme="secondary" onClick={this.login}>Login</Button>
                <Button theme="secondary" onClick={this.toggleRegister}>Register</Button>
              </div>
            </div>
          )
        : ( <div>
              <div className="register-title">
                <Typography use="headline4">Register</Typography>
              </div>
              <form className="register-form">
                <TextField required label="First Name" type="First-Name" onChange={({target}) => this.setState({first_name: target.value})}/>
                <TextField required label="Last Name" type="Last-Name" onChange={({target}) => this.setState({last_name: target.value})}/>
                <TextField required label="User Name" type="User-Name" onChange={({target}) => this.setState({user_name: target.value})}/>
                <TextField required label="Email" type="Email" onChange={({target}) => this.setState({email: target.value})}/>
                <TextField required label="Password" type="Password" onChange={({target}) => this.setState({password: target.value})}/>
                <Button theme="secondary" onClick={this.register}>Register</Button>
                <Button theme="secondary" onClick={this.toggleLogin}>Login</Button>
              </form>
            </div>
          )}

      </ThemeProvider>
      </div>
    )
  }

}

export default Register;
