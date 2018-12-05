import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInformation from './UserInformation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  getUserInformation(username) {
    return fetch('https://api.github.com/users/${username}')
    .then(response => response.json())
    .then(response => {return response;})
  }
  
  getUserRepos(username){
    return fetch('https://api.github.com/users/${username}/repos')
    .then(response => response.json())
    .then(response => {return response;})
  }

  
  async submitRequest(e){
    e.preventDefault();
    let user = await this.getUserInformation(this.refs.username.value);
    this.setState({avatar_url: user.avatar_url, 
      username: user.login, 
      followers: user.followers,
      following: user.following,
      url: user.url,
    });
    let repo = await this.getUserRepos(this.refs.username.value);
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
    let user;
    if(this.state.username) {
      user = 
      <div className="resultBadge">
        <img src={this.state.avatar_url}/>
        <p className="userInfo">
         Username: <br/>
         {this.state.user} 
        </p> 
        <p className="followerInfo">
         {this.state.followers} Followers
        </p>
        <p className="followingInfo">
          Following {this.state.following} users
        </p>
      </div>
    }
    let repo;
    if(this.state.username) {
    repo =
      <div className="repoResults">
         <p>
           {this.state.name}
        </p>
      </div>
    }
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
          <button onClick={e => this.submitRequest(e)}>
            Click me
          </button>
          <p className="Search-intro">
                  {user}
               </p>
          <p>
            {repo}
          </p>
          
        </div>
      </div>
    );
  }
}

export default App;
