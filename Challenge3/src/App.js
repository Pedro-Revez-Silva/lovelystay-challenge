import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      repos: null, 
    }
  }

  getUserInformation(username) {
    return fetch('https://api.github.com/users/Pedro-Revez-Silva')
    .then(response => response.json())
    .then(response => {return response})
  }
  
  getUserRepos(username){
    return fetch('https://api.github.com/users/Pedro-Revez-Silva/repos')
    .then(response => response.json())
    .then(response => {return response})

    /*TO-DO
    Implement fetch information for all the repos and update state with description.*/
    
  }

  /* This method will fetch the user and repo information and update the state*/
  async submitRequest(e){
    e.preventDefault();
    var button = document.getElementById("button");
    button.style.visibility = 'hidden';

    const {value} = this.refs.username;

    let user = await this.getUserInformation(value);
    let repos = await this.getUserRepos(value);

    this.setState({
      user: {
        avatar_url: user.avatar_url, 
        username: user.login, 
        followers: user.followers,
        following: user.following,
        url: user.url,
      },
      repos,
    }); 
  }


  renderRepos(repos) {
    return repos.map(item => {
      return <div key={item.id} className="repoResults">
        <p>
          {item.name}
          {item.desccription}
        </p>
      </div>
    })
  }

  renderUser(user) {
    return (
      <div className="resultBadge">
        <img src={user.avatar_url} />
        <p className="userInfo">
          Username: <br />
          {user.username}
        </p>
        <p className="followerInfo">
          {user.followers} Followers
                </p>
        <p className="followingInfo">
          Following {user.following} users
                </p>
      </div>
    )
  }

  render() {
    const {user, repos} = this.state;

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
          <button id ='button' ref='username' defaultValue='Pedro-Revez-Silva' onClick={e => this.submitRequest(e)}>
            Click me
          </button>
          <div className="Search-intro">
              <h4>User Info:</h4>
                  {user && this.renderUser(user)}
               </div>
          <div>
            <h4>Repos:</h4>
            {repos && this.renderRepos(repos)}
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
