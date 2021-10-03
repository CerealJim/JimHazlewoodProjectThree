import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue, push} from 'firebase/database';
import './App.css';
import TaskItem from './TaskItem.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      // console.log(result.val());

      const myData = snapshot.val();
      const newArray = [];

      for (let property in myData) {
        console.log(property);
        console.log(myData)
        const taskObject = {
          key: property,
          title: myData[property].taskName,          
        }
        newArray.push(taskObject);
      }
      setTasks(newArray);
    })
  }, [])


  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput) {
      const taskObject = {
        taskName: userInput,
        complete: false
      }
      const dbRef = ref(realtime);
      push(dbRef, taskObject);
      setUserInput("");
    } else {
      alert('write something!');
    }
    // console.log('submitted')
    // console.log(userInput)
  }

  return (
    <div className="App">
      <h1>test</h1>

      <form onSubmit={handleSubmit}>
          <label htmlFor="usertasks">Type the name of a task to add!</label>
          <input 
          type="text" 
          id="usertasks" 
          onChange={handleChange}
          value={userInput}
          />
          <button>Add it!</button>
      </form>
      <ul>
        {tasks.map((individualTaskObject) => {
          return (
            <TaskItem key={individualTaskObject.key}
            title={individualTaskObject.title}
            />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
