import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  Router,
  Route,
} from 'react-router-dom';
import rootReducer from './reducers';
import history from './history';
import { Home, WebPlayerPlay, PublishForm, Artist, ArtistFormPage, WebPlayerBrowse } from './pages';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = App.createStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router history={history}>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/artist/publish" component={PublishForm} />
            <Route path="/artist/manage" component={Artist} />
            <Route path="/artist/generalInfo" component={ArtistFormPage} />
            <Route path="/player/browse" component={WebPlayerBrowse} />
            <Route path="/player/play" component={WebPlayerPlay} />
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
