// react
import React from 'react';

// react native
import {ScrollView, Text, View, Dimensions, TextInput} from "react-native";
// ob
import { observer } from "mobx-react";

import { List, ListItem, FormLabel, FormInput, Button } from 'react-native-elements';

import Image from 'react-native-scalable-image';

import CheckBox from 'react-native-checkbox';

@observer
export default class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      createTodo: '',
      filterTodo: ''
    }

    global.storage.load({
    	key: 'todos',

    	// autoSync(default true) means if data not found or expired,
    	// then invoke the corresponding sync method
    	autoSync: true,

    	// syncInBackground(default true) means if data expired,
    	// return the outdated data first while invoke the sync method.
    	// It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
    	syncInBackground: true

    }).then(res => {
    	// found data go to then()
    	console.log(res);
      this.props.store.todos = res;
    }).catch(err => {
    	console.warn(err.message);
    });

  }

  toggleComplete(todo) {
    todo.complete = !todo.complete;
  }

  // submit
  submitForm = () => {
    const { createTodo, filterTodo } = this.state;

    if(createTodo) {
      this.props.store.createTodo(createTodo);
    }
    else if(filterTodo) {
      this.props.store.filter = filterTodo;
    }
    else {
      this.props.store.filter = '';
    }
  };

  // render
  render() {
    // clearComplete is method from store
    // filter is var
    // filter is computed
    // todos is var
    const { clearComplete, filter, filteredTodos, todos } = this.props.store;

    const todoLis = filteredTodos.map( (todo, index) => {
      return (
        <View key={index}>
          <CheckBox
            label={todo.value}
            checked={todo.complete}
            onChange={this.toggleComplete.bind(this, todo)}
          />
        </View>
      );
    });

    // https://github.com/facebook/react-native/issues/511
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <FormLabel>Create new todo</FormLabel>
          <TextInput
            ref='createTodo'
            autoFocus={true}
            value={this.state.createTodo}
            placeholder='Create new todo'

            onChangeText={createTodo => this.setState({createTodo})}
            onFocus= {() => this.setState({filterTodo: ''})}
            style={{ width: 300, height: 50 }}
          />

          <FormLabel>Filter todo</FormLabel>
          <TextInput
            ref='filterTodo'
            value={this.state.filterTodo}
            placeholder='Filter todo'
            onChangeText={filterTodo => this.setState({filterTodo})}

            onFocus= {() => this.setState({createTodo: ''})}
            style={{ width: 300, height: 50 }}
          />

          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>
            { todoLis }
          </View>

          <Button
            large
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
            title='SUBMIT'
            onPress={this.submitForm}
          />
        </View>
      </ScrollView>
    );
  }
}
