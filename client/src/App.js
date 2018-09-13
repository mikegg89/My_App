import React, { Component } from 'react';
import './App.css';
import TopNavBar from './components/topNavBar';
import Register from './components/register';
//import { Switch, Route } from 'react-router-dom';

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
      <div>
        <TopNavBar />
        <Register />
      </div>

    );
  }
}

export default App;
