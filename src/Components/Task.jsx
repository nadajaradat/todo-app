import React from 'react'
import '../App.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
function Task() {
  return (
    <div className="todo">
        <div className="todo-text">
          <input className="checkbox" type="checkbox" id="isCompleted" />
        </div>
        <div>Learn useEffect Hook</div>

        <div className="todo-actions">
          <button className="submit-edits" title ="Edit"><EditIcon/></button>
          <button className="submit-edits" title ="delete"><DeleteIcon/></button>
          <button className="submit-edits" title = "important"><StarBorderIcon/></button>
        </div>
      </div>
  )
}

export default Task