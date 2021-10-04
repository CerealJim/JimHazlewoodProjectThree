import { useState } from 'react';
import realtime from './firebase.js';
import {ref, remove, update} from 'firebase/database';
import './App.css';
import ModalModify from './ModalModify.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TaskItem(props) {

  const [show, setShow] = useState(false)

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

    const newTaskObject = {
      taskTomorrow: newDayVal
    }

    update(dbRef, newTaskObject)
  }
  
  const handleTitle = (taskId, event) => {
    const dbRef = ref(realtime, taskId)

    const newTaskObject = {
      taskName: event.target.newTaskName.value,
    }
    update(dbRef, newTaskObject)
    setShow(false)
  }

  return(
    <>
      <li>
        <div className="taskItem">
          <div className="taskCompleteContainer" onClick={ () => handleComplete(props.id, props.complete) }>
            {
              props.complete === false ?
              <p className="check"><FontAwesomeIcon icon="square" /> {props.title}</p> :
              <p className="checkMarked"><FontAwesomeIcon icon="check-square" /> {props.title}</p>
            }
          </div>

          <button onClick={ () => handleDelete(props.id) }>Delete</button>
          <button onClick={ () => handleTiming(props.id, props.tomorrow) }>Save for later</button>
          <button onClick={ () => setShow(true)}>Modify</button>
          <ModalModify 
            onClose={() => setShow(false)} 
            handleModalSubmit={(event) => handleTitle(props.id, event)}
            title={props.title}
            show={show}
          />
        </div>
      </li>
    </>
  )
}

export default TaskItem;