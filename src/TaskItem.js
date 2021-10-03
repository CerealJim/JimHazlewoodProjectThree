
import realtime from './firebase.js';
import {ref, remove, update} from 'firebase/database';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TaskItem(props) {
  // console.log(props,"printing props")

  const handleDelete = (taskId) => {
    const dbRef = ref(realtime, taskId)
    remove(dbRef);
  }

  const handleComplete = (taskId, taskComplete) => {
    const dbRef = ref(realtime, taskId)
    let newTaskVal = !taskComplete
    console.log(newTaskVal)
    const newTaskObject = {
      taskComplete: newTaskVal
    }
    update(dbRef, newTaskObject)
  }

  const handleTiming = (taskId, taskDay) => {
    const dbRef = ref(realtime, taskId)
    let newDayVal = !taskDay
    console.log(newDayVal)
    const newTaskObject = {
      taskTomorrow: newDayVal
    }
    update(dbRef, newTaskObject)
  }
  
  const handleTitle = (taskId) => {
    const dbRef = ref(realtime, taskId)
    const newTaskObject = {
      taskName: "somethingElse",
    }
    update(dbRef, newTaskObject)
  }

  return(
    <>
      <li>
        <div className="taskItem">
          <div className="taskCompleteContainer" onClick={ () => handleComplete(props.id, props.complete) }>
            {
              props.complete === false ?
              <p><FontAwesomeIcon icon="square" /> {props.title}</p> :
              <p><FontAwesomeIcon icon="check-square" /> {props.title}</p>
            }
          </div>

          <button
            onClick={ () => handleDelete(props.id) }
          >Delete</button>
          <button
            onClick={ () => handleTiming(props.id, props.tomorrow) }
          >Push to tomorrow</button>
          <button
            onClick={ () => handleTitle(props.id) }
          >Change Task Name</button>
        </div>
      </li>
    </>
  )
}

export default TaskItem;