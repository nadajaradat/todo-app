import React from 'react';
import '../App.css';
import Completed from './Completed';
import Tasks from './Tasks';
import AddTask from './AddTask';

function ToDo() {
  return (
    <div className="todo-container">
      <div className="content">
      <AddTask/>
        {/* Tasks and Completed components */}
        <Tasks />
        <Completed />
      </div>

      
    </div>
  );
}

export default ToDo;
