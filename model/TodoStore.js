// need computed, mix with var
// observe var
import { computed, observable } from "mobx";
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

// storage
var storage = new Storage({
	// max 1000 item???
	size: 1000,

  // async storage from react native
	storageBackend: AsyncStorage,

	// expire time, default 1 day(1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	defaultExpires: null,

	// cache data in the memory. default is true.
	enableCache: true,

	// if data was not found in storage or expired,
	// the corresponding sync method will be invoked and return
	// the latest data.
	sync : {
		// we'll talk about the details later.
	}
});

global.storage = storage;


// a single to do
class Todo {
  // ob to do text
  @observable value
  // ob to do id
  @observable id
  // ob finished or not
  @observable complete

  // init method with value
  constructor(value) {
    // to do text
    this.value = value
    // id is date_now
    this.id = Date.now()
    // finish false
    this.complete = false
  }
}

// so what exactly is a store????
// mix with var, computed, method....... and more.
// why the array of todo becomes store....????????????
export class TodoStore {
  // ob todo array
  @observable todos = [];
  // filter
  @observable filter = "";

  // basically, this compute filter out some of todos
  @computed get filteredTodos() {
    // filter is reg_exp
    // this.filter is input
    var matchesFilter = new RegExp(this.filter, "i")
    // we use this.filter input, to test a single todo.value
    return this.todos.filter((todo) => {
      if(this.filter !== '') {
        return matchesFilter.test(todo.value);
      }
      else {
        return true;
      }
    });
    //return this.todos;
    //return this.todos.filter(() => false);
  }

  // we push a single to do
  // todo is an obj with value
  createTodo(value) {
    let theTodo = new Todo(value);
    this.todos.push(theTodo);

    // Save something with key only.
    // Something more unique, and constantly being used.
    // They are permanently stored unless you remove.
    storage.save({
    	key: 'todos',   // Note: Do not use underscore("_") in key!
    	rawData: this.todos
    });
  }

  // clear a todo
  // fat arrow func
  clearComplete = () => {
    // not_done_complete
    // todo array filter
    // we have all the incompleted todo
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    // entire replace array??????????????????????????????
    this.todos.replace(incompleteTodos)
  }
}

// export the todo array sort of ...
export default new TodoStore
