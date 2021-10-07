import { useState, useEffect } from 'react';
import realtime from './firebase.js';
import {ref, onValue, remove} from 'firebase/database';
import './App.css';
import TaskItem from './components/TaskItem.js';
import TaskForm from './components/TaskForm.js';
import logoSolidOnly from './logoSolidOnly.png'
import ModalDeleteAll from './components/modals/ModalDeleteAll.js';




import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faSquare, faWindowClose, faUserClock, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'



function App() {
  //Adding FontAwesome icons to use
  library.add( faCheckSquare, faSquare, faWindowClose, faUserClock, faEdit, faPlus )

  const [tasks, setTasks] = useState([]);
  const [showDeleteAll, setShowDeleteAll] = useState(false)
  const [showOption, setShowOption] = useState("Today") // three options "today", "deferred", "All"
  
  //Create the subscrtiption(link) to firebase and will update anytime a value changes
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
        newArray.push(taskObject);
      }
      setTasks(newArray);
    })
  }, [])

  //Delete all button function based on the showOption tab selected
  const deleteCurrent = (e) => {
    e.preventDefault();
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
    setShowDeleteAll(false)
  }


  return (
    <>
      <header>
        <div className="headerContainer wrapper">
          <div className="titleContainer">
            <div className="imgContainer">
              <img src={logoSolidOnly} alt="Logo containing a pad of paper and a pen" />
            </div>
            <h1>Taskify</h1>
          </div>
        </div>
      </header>
      <main className="wrapper">
        <section className="formContainer">
          <h2>📝 Let's help you get organized by starting a task list! 📝</h2>
          <TaskForm />
        </section>
        <section className="taskContainer">
          <form className="displayButtonContainer">
            <input type="radio" id="radioToday" name="switch" value="Today" onClick={() => setShowOption("Today")} defaultChecked />
            <label htmlFor="radioToday">Today</label>
            <input type="radio" id="radioDeferred" name="switch" value="Deferred" onClick={() =>  setShowOption("Deferred")} />
            <label htmlFor="radioDeferred">Deferred</label>
            <input type="radio" id="radioAll" name="switch" value="All" onClick={() =>  setShowOption("All")} />
            <label htmlFor="radioAll">All</label>
          </form>
          <div className="individualTaskContainer">
          <div className="deleteCurrentList">
            <button className="deleteCurrentListButton" onClick={() => setShowDeleteAll(true)}>Delete all tasks</button>
            <ModalDeleteAll
              onClose={() => setShowDeleteAll(false)} 
              handleModalSubmit={(e) => deleteCurrent(e) }
              show={showDeleteAll}
            />
          </div>
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
      </main>
      <footer>
        <div className="footnote wrapper">
          <p>Created by Jim Hazlewood at <a href="https://junocollege.com/">Juno College of Technology</a> 2021</p>
        </div>
      </footer>
    </>
  );
}

export default App;
