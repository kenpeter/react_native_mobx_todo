// react
import React from 'react';

// react native
import {ScrollView, Text, View, Dimensions, TextInput} from "react-native";
// ob
import { observer } from "mobx-react";

import { List, ListItem, FormLabel, FormInput, Button } from 'react-native-elements';

import Image from 'react-native-scalable-image';

@observer
export default class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      createTodo: '',
      filterTodo: ''
    }
  }

  submitForm = () => {
    const { createTodo, filterTodo } = this.state;

    if(createTodo) {
      this.props.store.createTodo(createTodo);
    }
    else {

    }
  };

  // render
  render() {
    // clearComplete is method from store
    // filter is var
    // filter is computed
    // todos is var
    const { clearComplete, filter, filteredTodos, todos } = this.props.store;

    const todoLis = this.props.store.todos.map( (todo, index) => {
      return <Text key={index}>{ todo.value }</Text>;
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
            style={{ width: 300, height: 50 }}
          />

          <FormLabel>Filter todo</FormLabel>
          <TextInput
            ref='filterTodo'
            value={this.state.filterTodo}
            placeholder='Filter todo'
            onChangeText={filterTodo => this.setState({filterTodo})}
            style={{ width: 300, height: 50 }}
          />

          { todoLis }

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
