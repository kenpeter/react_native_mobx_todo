import React from 'react';
import {Router, Scene} from 'react-native-mobx';

import Counter from './components/Counter';
import store from './model/counter';

export default class App extends React.Component {
  render() {
    return (
      <Router store={store}>
        <Scene key="launch" component={Counter} hideNavBar/>
      </Router>
    );
  }
}
