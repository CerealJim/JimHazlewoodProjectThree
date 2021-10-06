import { useState } from 'react';
import realtime from './firebase.js';
import {ref, remove, update} from 'firebase/database';
import './App.css';
import ModalModify from './ModalModify.js';
import ModalSave from './ModalSave.js';
import ModalDelete from './ModalDelete.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TaskItem(props) {

  //UseState for modals
  const [showModify, setShowModify] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleDelete = (taskId, event) => {
    event.preventDefault();
    const dbRef = ref(realtime, taskId)
    console.log(dbRef, "dbREF")
    remove(dbRef);
    setShowDelete(false)
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

  const handleTiming = (taskId, taskDay, event) => {
    event.preventDefault();
    const dbRef = ref(realtime, taskId)
    let newDayVal = !taskDay
    const newTaskObject = {
      taskTomorrow: newDayVal
    }
    update(dbRef, newTaskObject)
    setShowSave(false)
  }
  
  const handleTitle = (taskId, event) => {
    const dbRef = ref(realtime, taskId)
    const newTaskObject = {
      taskName: event.target.newTaskName.value,
    }
    update(dbRef, newTaskObject)
    setShowModify(false)
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
          <button className="deferTaskButton" title="Defer" onClick={() => setShowModify(true)}><FontAwesomeIcon icon="edit" /></button>
          <ModalModify 
            onClose={() => setShowModify(false)} 
            handleModalSubmit={(event) => handleTitle(props.id, event)}
            title={props.title}
            show={showModify}
          />
          <button className="deferTaskButton" title="Defer" onClick={() => setShowSave(true)}><FontAwesomeIcon icon="user-clock" /></button>
          <ModalSave
            onClose={() => setShowSave(false)} 
            handleModalSubmit={(event) => handleTiming(props.id, props.tomorrow, event) }
            title={props.title}
            show={showSave}
          />
          <button className="deleteTaskButton" title="Delete" onClick={() => setShowDelete(true)}><FontAwesomeIcon icon="window-close" /></button>
          <ModalDelete
            onClose={() => setShowDelete(false)} 
            handleModalSubmit={(event) => handleDelete(props.id, event) }
            title={props.title}
            show={showDelete}
          />
        </div>
      </li>
    </>
  )
}

export default TaskItem;