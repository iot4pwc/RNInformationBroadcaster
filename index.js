import App from './App';
import logger from 'redux-logger';
import React, { Component } from 'react';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import {AsyncStorage} from 'react-native';

configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(
  	thunkMiddleware,
  	logger
  ), autoRehydrate());
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore(undefined);
persistStore(store, {storage: AsyncStorage});

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AndroidInformationBoardcaster', () => Root);
