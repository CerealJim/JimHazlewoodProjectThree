
import realtime from './firebase.js';
import {ref, remove, update} from 'firebase/database';
import './App.css';

function TaskItem(props) {
  // console.log(props,"printing props")

  const handleDelete = (taskId) => {
    const dbRef = ref(realtime, taskId)
    remove(dbRef);
  }

  const handleTiming = (taskId, taskDay) => {
    const dbRef = ref(realtime, taskId)
    // let newDayVal = taskDay
    // if (taskDay === true) {
    //   newDayVal = false
    // } else if (taskDay === false) {
    //   newDayVal = true
    // }
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
          <p>{props.title}</p>
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