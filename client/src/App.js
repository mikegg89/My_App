import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/layout/navBar';
import Landing from './components/layout/landing';
import Footer from './components/layout/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';

import './App.css';

//check for jwtToken
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired jwtToken
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // logout users
    store.dispatch(logoutUser());
    // TODO: clear current profiles
    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
