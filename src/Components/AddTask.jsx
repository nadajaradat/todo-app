import React from 'react'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function AddTask() {
  return (
    < >
    <form>
    <input
      className="add-task"
      type="text"
      placeholder="Add new task ..."
    />
    <button type="submit" className="add-button">
    <AddCircleOutlineOutlinedIcon />
    </button>
  </form>
  </>
  )
}

export default AddTask