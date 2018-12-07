import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('always renders a div', () => {
  const divs = render(<App/>).find('div');
  expect(divs.length).toBeGreaterThan(0);
});

describe('the rendered div', () => {
  it('contains everything else that gets rendered', () => {
    const divs = render(<App/>).find('div');
    const wrappingDiv = divs.first();

    expect(wrappingDiv.children()).toEqual(App().children());
  });
});

it('Always renders a button', () => {
  expect(App().find('button').length).toBeGreaterThan(1);
})

/* TO-DO
Implement tests with a mock API
Implement tests for the onclick event
Implement tests for the render of user and repo information */