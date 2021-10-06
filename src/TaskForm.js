import { useState } from 'react';
import realtime from './firebase.js';
import {ref, push} from 'firebase/database';
import './App.css';

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
      alert('write something!');
    }
  }

  return(
    <>
      <form className="taskForm" onSubmit={handleSubmit}>
        <label htmlFor="usertasks">Type the name of a task to add!</label>
        <input 
        type="text" 
        id="usertasks" 
        onChange={handleChange}
        value={userInput}
        />
        <button>Add</button>
      </form>
    </>
  )
}

export default TaskForm;