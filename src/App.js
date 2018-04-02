import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import rootReducer from './reducers';
import './App.css';
import { ToggleButton, Hello } from './components/common';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = App.createStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <Link to="/hello">Hello World Page</Link>
            <Link to="/toggle">Toggle Button Page</Link>
            <Route path="/hello" component={Hello} />
            <Route path="/toggle" component={ToggleButton} />
          </div>
        </Router>
      </Provider>
    );
  }

  static createStore() {
    const middlewares = [thunk];
    if (process.env.NODE_ENV === 'development') {
      const { logger } = require('redux-logger');

      middlewares.push(logger);
    }
    return createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(...middlewares)
    );
  }
}

export default App;
