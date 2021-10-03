import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue} from 'firebase/database';
import './App.css';
import TaskItem from './TaskItem.js';
import TaskForm from './TaskForm.js';
import TaskTiming from './TaskTiming.js';


function App() {
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
    <div className="App">
      <h1>test</h1>
      <TaskForm />
      <TaskTiming />
      <ul>
        {tasks.map((individualTaskObject) => {
          return (
            <TaskItem key={individualTaskObject.key} 
            id={individualTaskObject.key}
            title={individualTaskObject.title}
            complete={individualTaskObject.complete}
            />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
