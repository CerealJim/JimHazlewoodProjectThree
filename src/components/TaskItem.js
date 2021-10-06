import { useState } from 'react';
import realtime from '../firebase.js';
import {ref, remove, update} from 'firebase/database';
import '../App.css';
import ModalModify from './modals/ModalModify.js';
import ModalSave from './modals/ModalSave.js';
import ModalDelete from './modals/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TaskItem(props) {

  //UseState for modals
  const [showModify, setShowModify] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleDelete = (taskId, event) => {
    event.preventDefault();
    const dbRef = ref(realtime, taskId)
    remove(dbRef);
    setShowDelete(false)
  }

  const handleComplete = (taskId, taskComplete) => {
    const dbRef = ref(realtime, taskId)
    let newTaskVal = !taskComplete
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
    if (event.target.newTaskName.value){
      const dbRef = ref(realtime, taskId)
      const newTaskObject = {
        taskName: event.target.newTaskName.value
      }
      update(dbRef, newTaskObject)
      setShowModify(false)
    } else{
      event.preventDefault()
      alert('Please enter text');
    }
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
          <div className="taskButtons">
            <button className="modifyTaskButton" title="Edit Task" onClick={() => setShowModify(true)}><FontAwesomeIcon icon="edit" /></button>
            <ModalModify 
              onClose={() => setShowModify(false)} 
              handleModalSubmit={(event) => handleTitle(props.id, event)}
              title={props.title}
              show={showModify}
              />
            <button className="deferTaskButton" title="Defer Task" onClick={() => setShowSave(true)}><FontAwesomeIcon icon="user-clock" /></button>
            <ModalSave
              onClose={() => setShowSave(false)} 
              handleModalSubmit={(event) => handleTiming(props.id, props.tomorrow, event) }
              title={props.title}
              show={showSave}
              tomorrow={props.tomorrow}
              />
            <button className="deleteTaskButton" title="Delete" onClick={() => setShowDelete(true)}><FontAwesomeIcon icon="window-close" /></button>
            <ModalDelete
              onClose={() => setShowDelete(false)} 
              handleModalSubmit={(event) => handleDelete(props.id, event) }
              title={props.title}
              show={showDelete}
            />
          </div>
        </div>
      </li>
    </>
  )
}

export default TaskItem;