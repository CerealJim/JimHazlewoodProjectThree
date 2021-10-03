
import realtime from './firebase.js';
import {ref} from 'firebase/database';
import './App.css';

function TaskTiming() {


  const handleClick = () => {

  }


  return (
    <div className="timingButtonContainer">
        <button className="todayButton timingButton" onClick={handleClick}>Today</button>
        <button className="tomorrowButton timingButton" onClick={handleClick}>Tomorrow</button>
        <button className="deleteButton timingButton" onClick={handleClick}>Delete all tasks</button>
    </div>
  )
}

export default TaskTiming;