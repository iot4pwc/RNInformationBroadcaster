import App from './App';
import logger from 'redux-logger';
import React, { Component } from 'react';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';

configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(
  	thunkMiddleware,
  	logger
  ));
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

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
