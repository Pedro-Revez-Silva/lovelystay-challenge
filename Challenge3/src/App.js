import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInformation from './UserInformation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { user: '' }
  }

  getUserInformation(user) {
    /*
      TODO: fetch a user from the GitHub API

      TIPS:
       1) The Fetch API provides an interface for
         fetching resources (including across the network).
       2) Maybe you want to update the state here.
    */
    return fetch('https://api.github.com/users/${user}')
    .then(response => response.json())
    .then(response => {return response;})
  }
  
  getUserRepos(user){
    return fetch('https://api.github.com/users/${user}/repos')
    .then(response => response.json())
    .then(response => {return response;})
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="App-intro">
          <hr />
          <p>Click on the button to fetch the user information</p>
          <button onClick={this.getUserInformation.bind(this)}>
            Click me
          </button>
        </div>
        <UserInformation />
      </div>
    );
  }
}

export default App;
