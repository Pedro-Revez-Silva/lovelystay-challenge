import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('User information request is successful', ()=>{
  const request = getUserInformation('Pedro-Revez-Silva');
  
});

it('Repo information request is successful', ()=>{
  const request = getUserRepos('Pedro-Revez-Silva');
  
});
