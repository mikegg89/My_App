import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layout/navBar';
import Landing from './components/layout/landing';
import Footer from './components/layout/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user_name: null,
        first_name: '',
        last_name: '',
      };
  }

  // componentDidMount() {
  //   fetch('/api/profile/user')
  //     .then(res => res.json())
  //     .then(users => {
  //         if(users.length > 0) {
  //           const user_name = (users[0].user_name[0].toUpperCase() + users[0].user_name.slice(1));
  //           const first_name = (users[0].first_name[0].toUpperCase() + users[0].first_name.slice(1));
  //           const last_name = (users[0].last_name[0].toUpperCase() + users[0].last_name.slice(1));
  //           this.setState({ user_name, first_name, last_name });
  //         }
  //       }
  //     ).catch((error) => console.error('No user was found'));
  // }

  render() {
    return (
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
    );
  }
}

export default App;
