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

  async submitRequest(e){
    e.preventDefault();
    let user = await this.getUserInformation(this.refs.user.value);
    this.setState({avatar_url: user.avatar_url, 
      username: 
      user.login, 
      followers: user.followers,
      following: user.following,
      url: user.url,
    });
    let repo = await this.getUserRepos(this.refs.user.value);
        this.setState({ name: repo.name,
        description: repo.description,
        git_url: repo.git_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        size: repo.size,
     });
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
