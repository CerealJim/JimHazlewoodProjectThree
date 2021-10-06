import { useState } from 'react';
import realtime from '../firebase.js';
import {ref, push} from 'firebase/database';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TaskForm() {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput) {
      const taskObject = {
        taskName: userInput,
        taskComplete: false,
        taskTomorrow: false
      }
      const dbRef = ref(realtime);
      push(dbRef, taskObject);
      setUserInput("");
    } else {
      alert('Please enter text');
    }
  }

  return(
    <>
      <form className="taskForm" onSubmit={handleSubmit}>
        <label htmlFor="usertasks">Add <span>Today's</span> Task:</label>
        <div className="inputContainer">
          <input 
          type="text" 
          id="usertasks" 
          onChange={handleChange}
          value={userInput}
          placeholder="ex. start project 3"
          />
          <button className="addTaskButton" title="add a task"><FontAwesomeIcon icon="plus" /></button>
        </div>
      </form>
    </>
  )
}

export default TaskForm;