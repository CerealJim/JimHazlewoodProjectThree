import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ModalModify(props) {

  if(!props.show) {
    return null
  }



  return (
    <div className="modal" onClick={props.onClose}>
      {/* using 'stopPropagation' method */}
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <h4 className="modalTitle">Are you sure you want to change your task?</h4>
        </div>
        <form className="modalBody" onSubmit={props.handleModalSubmit}>
          <label htmlFor="newTaskName">Update task name here</label>
          <div className="modalModify">
            <input 
            type="text" 
            id="newTaskName"
            placeholder={props.title}
          />
            <button className="saveButton" type="submit">Save</button>
          </div>
          <button className="closeButton" onClick={props.onClose}><FontAwesomeIcon icon="window-close" /></button>
        </form>
      </div>
    </div>
  )
}

export default ModalModify