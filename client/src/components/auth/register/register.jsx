import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user_name: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
        email: '',
        errors: {}
      };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    let user = [];
    user.push([
      this.state.first_name,
      this.state.last_name,
      this.state.user_name,
      this.state.password,
      this.state.email,
      this.state.password2
    ]);

    axios.post('/api/users/register', user)
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err.response.data);
        this.setState({errors: err.response.data}
        )
      });

  }

  render() {

    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.user_name
                      })}
                      placeholder="User Name"
                      name="user_name"
                      value={this.state.user_name}
                      onChange={this.onChange}
                    />
                    {errors.user_name && (
                      <div className="invalid-feedback">{errors.user_name}</div>
                    )}
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.first_name
                    })}
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                  {errors.first_name && (
                    <div className="invalid-feedback">{errors.first_name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.last_name
                    })}
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                  {errors.last_name && (
                    <div className="invalid-feedback">{errors.last_name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password" name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
