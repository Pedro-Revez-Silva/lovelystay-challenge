import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInformation from './UserInformation';
import ReactDOM from 'react-dom'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      repos: null, 
    }
  }

  getUserInformation(username) {
    return fetch('https://api.github.com/users/${username}')
    .then(response => response.json())
    .then(response => {return response})
  }
  
  getUserRepos(username){
    return fetch('https://api.github.com/users/${username}/repos')
    .then(response => response.json())
    .then(response => {return response})
  }

  /* This method will fetch the user and repo information and update the state*/
  async submitRequest(e){
    e.preventDefault();

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
      repos: {name: repos.name,
        description: repos.description,
        git_url: repos.git_url,
        stargazers_count: repos.stargazers_count,
        forks_count: repos.forks_count,
        open_issues_count: repos.open_issues_count,
        size: repos.size,
      }
    }); 
  }


  renderRepos(repos) {
    return repos.map(item => {
      return <div key={item.id} className="repoResults">
        <p>
          {item.name}
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
          <form onSubmit={e => this.submitRequest(e)}>
            <input ref='username' type='text' placeholder='username' />
          </form>
          <button ref='username' defaultValue='Pedro-Revez-Silva' onClick={e => this.submitRequest(e)}>
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
