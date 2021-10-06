import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ModalSave(props) {

  if(!props.show) {
    return null
  }



  return (
    <div className="modal" onClick={props.onClose}>
      {/* using 'stopPropagation' method */}
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <form className="modalBody" onSubmit={props.handleModalSubmit}>
          <label htmlFor="newTaskName">Are you sure you want to move task: "{props.title}" to 
          {props.tomorrow === false ?
            " the deferred list" :
            " today's list"}?
          </label>
          <div className="modalAgree">
            <button className="saveButton" type="submit">Yes</button>
          </div>
          <button className="closeButton" onClick={props.onClose}><FontAwesomeIcon icon="window-close" /></button>
        </form>
      </div>
    </div>
  )
}

export default ModalSave