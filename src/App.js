import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue, remove} from 'firebase/database';
import './App.css';
import TaskItem from './TaskItem.js';
import TaskForm from './TaskForm.js';
import logoSolid from './logoSolid.png'
// import TaskButtons from './TaskButtons.js';



import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'



function App() {
  
  library.add( faCheckSquare, faSquare, faWindowClose)

  const [tasks, setTasks] = useState([]);
  // const [userInput, setUserInput] = useState("");
  // const [showToday, setShowToday] = useState(false)
  // const [showAll, setShowAll] = useState(false)

  const [showOption, setShowOption] = useState("Today") // three options "today", "deferred", "All"
  
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


  const deleteCurrent = () => {
    if (showOption === "All") {
      let dbRef = ref(realtime)
      remove(dbRef);
    } else{
      tasks.filter((individualTaskObject) => {
        return individualTaskObject.tomorrow === (showOption === "Deferred" ? true: false)
      }).map((filteredTask) =>{
        let dbRef = ref(realtime, filteredTask.key)
        return remove(dbRef);
      });
    }
  }


  return (
    <>
      <header>
        <div className="headerContainer wrapper">
          <div className="titleContainer">
            <div className="imgContainer">
              <img src={logoSolid} alt="Logo containing a pad of paper and a pen" />
            </div>
            <h1>Taskify</h1>
          </div>
        </div>
      </header>
      <section className="formContainer wrapper">
        <h2>Let's help you get organized by starting a task list!</h2>
        <TaskForm />
        <div>
          {/* <button className="todayButton" onClick={() => setShowToday(false)}>Today</button> */}
          {/* <button className="deferredButton" onClick={() => setShowToday(true)}>Deferred Tasks</button> */}
          {/* <form className="timingButtonContainer radioSwitch">
            <input type="radio" id="radioToday" name="switchToday" onClick={() => {setShowToday(false); setShowAll(false)}} checked/>
            <label for="radioToday">Today</label>
            <input type="radio" id="radioDeferred" name="switchDeferred" onClick={() => {setShowToday(true); setShowAll(false)}} />
            <label for="radioDeferred">Deferred</label>
            <input type="radio" id="radioAll" name="switchAll" onClick={() => setShowAll(true)} />
            <label for="radioAll">All</label>
          </form> */}
          <form className="displayButtonContainer">
            <input type="radio" id="radioToday" name="switchToday" onClick={() => setShowOption("Today")}/>
            <label htmlFor="radioToday">Today</label>
            <input type="radio" id="radioDeferred" name="switchDeferred" onClick={() =>  setShowOption("Deferred")} />
            <label htmlFor="radioDeferred">Deferred</label>
            <input type="radio" id="radioAll" name="switchAll" onClick={() =>  setShowOption("All")} />
            <label htmlFor="radioAll">All</label>
          </form>
          <button className="deleteCurrentList" onClick={() => deleteCurrent()}>Delete displayed tasks</button>

          {/* <button className="deleteButton" onClick={handleClick}>Delete all tasks</button> */}
        </div>
      </section>
      <section className="taskContainer wrapper">
          <h3>{showOption} Tasks</h3>
        <div className="individualTaskContainer">
          <ul>
            {tasks.filter((individualTaskObject) => {
              return showOption === "All" || individualTaskObject.tomorrow === (showOption === "Deferred" ? true: false)
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
        <div className="footnote wrapper">
          <p>Created at Juno College of Technology</p>
        </div>
      </footer>
    </>
  );
}

export default App;
