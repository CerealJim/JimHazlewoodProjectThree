import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue} from 'firebase/database';
import './App.css';
import TaskItem from './TaskItem.js';
import TaskForm from './TaskForm.js';
// import TaskButtons from './TaskButtons.js';



import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'



function App() {
  
  library.add( faCheckSquare, faSquare, faWindowClose)

  const [tasks, setTasks] = useState([]);
  // const [userInput, setUserInput] = useState("");
  const [showToday, setShowToday] = useState(false)

  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {

      const myData = snapshot.val();
      const newArray = [];

      for (let property in myData) {
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
        <h1>To Do List</h1>
      </header>
      <section className="formContainer">
        <h2>Let's help you get organized by starting a task list!</h2>
        <TaskForm />

        <div className="timingButtonContainer">
          <button className="todayButton" onClick={() => setShowToday(false)}>Today</button>
          <button className="deferredButton" onClick={() => setShowToday(true)}>Deferred Tasks</button>
          {/* <button className="deleteButton" onClick={handleClick}>Delete all tasks</button> */}
        </div>
      </section>
      <section className="taskContainer">
          {
          showToday === false ?
            <h3>Today's Task List</h3> :
            <h3>Deferred Tasks</h3>
          }
        <div className="individualTaskContainer">
          <ul>
            {tasks.filter((individualTaskObject) => {
              return individualTaskObject.tomorrow === showToday
              }).map((individualTaskObject) => {
                return (
                  <TaskItem key={individualTaskObject.key} 
                  id={individualTaskObject.key}
                  title={individualTaskObject.title}
                  complete={individualTaskObject.complete}
                  tomorrow={individualTaskObject.tomorrow}
                  />
                )
              })
            }
          </ul>
        </div>
      </section>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
