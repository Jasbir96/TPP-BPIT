// import React from 'react';
// import logo from './logo.svg';
import './App.css';
// imrc
import React, { Component } from 'react';
import TaskList from './components/TaskList';
// cc
class App extends Component {
  state = {
    tasks: [{ id: "1", name: "Learn JS" }, {
      id: "2", name: "Learn Es6"
    }, {
      id: "3", name: "Learn React"
    }]
  }
  removeTask = (toBeRemovedid) => {
    // remove task deleted task from state 
    let { tasks } = this.state;
    let remainingTasks = tasks
      .filter((task) => {
        return task.id
          != toBeRemovedid
      });
    this.setState({ tasks: remainingTasks });
  }
  render() {
    // list of all the tasks
    let {tasks}=this.state;
    return (
      <TaskList list={tasks} rTask={this.removeTask}></TaskList>
    );
  }
}
export default App;



