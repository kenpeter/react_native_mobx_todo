// need computed, mix with var
// observe var
import { computed, observable } from "mobx"

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
    //return this.todos.filter(todo => this.filter === '' || matchesFilter.test(todo.value))
    return this.todos;
  }

  // we push a single to do
  // todo is an obj with value
  createTodo(value) {
    this.todos.push(new Todo(value));
    console.log('push...');
    console.log(this.todos);
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
