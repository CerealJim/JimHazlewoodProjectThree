import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ModalDelete(props) {

  if(!props.show) {
    return null
  }



  return (
    <div className="modal" onClick={props.onClose}>
      {/* using 'stopPropagation' method */}
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <h4 className="modalTitle">Are you sure?</h4>
        </div>
        <form className="modalBody" onSubmit={props.handleModalSubmit}>
          <label htmlFor="newTaskName">Click yes to continue</label>
          <div className="modalAgree">
            <button className="saveButton" type="submit">Yes</button>
          </div>
          <button className="closeButton" onClick={props.onClose}><FontAwesomeIcon icon="window-close" /></button>
        </form>
      </div>
    </div>
  )
}

export default ModalDelete