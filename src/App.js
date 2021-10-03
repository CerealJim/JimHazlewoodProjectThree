import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue} from 'firebase/database';
import './App.css';
import TaskItem from './TaskItem.js';
import TaskForm from './TaskForm.js';
import TaskTiming from './TaskTiming.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'



function App() {
  
  library.add( faCheckSquare, faSquare)

  const [tasks, setTasks] = useState([]);
  // const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      // console.log(result.val());

      const myData = snapshot.val();
      const newArray = [];

      for (let property in myData) {
        // console.log(property, 'property key');
        // console.log(myData)
        const taskObject = {
          key: property,
          title: myData[property].taskName,
          complete: myData[property].taskComplete,
          tomorrow: myData[property].taskTomorrow
        }
        console.log(taskObject, "printing task object")
        newArray.push(taskObject);
      }
      setTasks(newArray);
    })
  }, [])


  return (
    <div className="wrapper">
      <header>
        <h1>Task List</h1>
        <h2>Input a task for today or tomorrow</h2>
      </header>
      <section className="formContainer">
        <TaskForm />
        <TaskTiming />
      </section>
      <section className="taskContainer">
        <h3>Today or tomorrow's task list title goes here{}</h3>
        <ul>
          {tasks.map((individualTaskObject) => {
            return (
              <TaskItem key={individualTaskObject.key} 
              id={individualTaskObject.key}
              title={individualTaskObject.title}
              complete={individualTaskObject.complete}
              tomorrow={individualTaskObject.tomorrow}
              />
            )
          })}
        </ul>
      </section>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
