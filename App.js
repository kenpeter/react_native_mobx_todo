import React from 'react';
import {Router, Scene} from 'react-native-mobx';

import TodoList from './components/TodoList';
import store from './model/TodoStore';

export default class App extends React.Component {
  render() {
    return (
      <Router store={store}>
        <Scene key="launch" component={TodoList} hideNavBar/>
      </Router>
    );
  }
}
