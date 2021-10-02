import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue, push} from 'firebase/database';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    // Here we create a variable that holds a reference to our database
    const dbRef = ref(realtime);

    // Here we add an event listener to that variable that will fire
    // every time there is a change in the database.

    // This event listener takes a callback function which we will use to get our data
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {

      // Here we use Firebase's .val() method to parse our database info the way we want it
      console.log(response.val());
    })
  }, [])


  return (
    <div className="App">
      <h1>test</h1>
      <ul>
        {tasks.map((individualTask) => {
          return (
            <li>
              <p>{individualTask}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
