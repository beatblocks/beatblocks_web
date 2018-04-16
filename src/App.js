import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import rootReducer from './reducers';
import { Home, WebPlayerPlay } from './pages';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = App.createStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/artist" component={Home} />
            <Route path="/player/browse" component={WebPlayerPlay} />
            <Route path="/player/music" component={WebPlayerPlay} />
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
