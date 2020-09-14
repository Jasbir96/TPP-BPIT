// import React from 'react';
// import logo from './logo.svg';
import './App.css';
// imrc
import React, { Component } from 'react';
import TaskList from './components/TaskList';
import InputBox from "./components/InputBox";
// cc
class App extends Component {
  state = {
    tasks: [{ id: "1", name: "Learn JS" }, {
      id: "2", name: "Learn Es6"
    },
    { id: "3", name: "Learn React" }]
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
  
  addTask = (taskName) => {
    let { tasks } = this.state;
    tasks.push({ id: tasks.length + 1, name: taskName })
    this.setState({ tasks: tasks });
  }
  render() {
    // list of all the tasks
    let { tasks } = this.state; return (
      <React.Fragment>
        <InputBox addTask={this.addTask}></InputBox>
        <TaskList list={tasks} rTask={this.removeTask}></TaskList>
      </React.Fragment>
    );
  }
}
export default App;



