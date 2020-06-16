import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator.js'
import reducer from './reducers/index.js'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger';
import firebase from './config/firebase.js'
import { createStore, applyMiddleware } from 'redux' 
//const middleware = applyMiddleware(thunkMiddleware, logger)
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer,middleware)
console.disableYellowBox = true; //disable debugger display on the emulator

export default class App extends React.Component {
  render() {
    return (
      <Provider store = {store}>
      <SwitchNavigator />
      </Provider>
    );
  }
}

