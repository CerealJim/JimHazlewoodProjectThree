
import realtime from './firebase.js';
import {ref, remove} from 'firebase/database';
import './App.css';

function TaskItem(props) {
  // console.log(props,"printing props")

  const handleDelete = (deleteTask) => {
    const dbRef = ref(realtime, deleteTask)
    remove(dbRef);
  }

  return(
    <>
      <li>
        <div className="taskItem">
          <h2>{props.title}</h2>
          <button
            onClick={ () => handleDelete(props.id) }
          >delete</button>
        </div>
      </li>
    </>
  )
}

export default TaskItem;