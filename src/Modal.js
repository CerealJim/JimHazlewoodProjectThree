import React from "react";

function Modal(props) {

  if(!props.show) {
    return null
  }



  return (
    <div className="modal" onClick={props.onClose}>
      {/* using 'stopPropagation' method */}
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <h4 className="modalTitle">{props.title}</h4>
        </div>
        <form className="modalBody" onSubmit={props.handleModalSubmit}>
          <label htmlFor="newTaskName">Update the task name</label>
          <input 
            type="text" 
            id="newTaskName"
            placeholder={props.title}
            // value={props.userInput}
            // onChange={handleChange}
            // value={userInput} 
          />
          <button className="modalButton closeButton" onClick={props.onClose}>Close</button>
          <button className="modalButton saveButton" type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Modal