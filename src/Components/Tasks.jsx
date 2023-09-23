// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from "@mui/material";

function Tasks() {
  const [taskNameInputValue, setTaskNameInputValue] = useState("");
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => {
    const storageTask = JSON.parse(localStorage.getItem("tasks"));
    if (storageTask !== null) {
      setTasks(storageTask);
    }
  }, []);

  
  const taskList = tasks.map((task) => {
    return (
      <div key={task.id} className='todo'>
      <Checkbox
        style={{paddingTop:'1px'}}
        checked={task.completed}
        onChange={() => handleTaskCompleted(task.id)}
     
      />
          <Box flexGrow={1}>{task.name}</Box>
          <Box mr={2}>
            <Button
              className="submit-edits" title="Delete"
              onClick={() => {
                handleDeleteClick(task.id);
              }}
              variant="outlined"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </Box>
          <Box>
            <Button
              className="submit-edits" title="edit"
              onClick={() => {
                handleOpenDialog(task.id);
              }}
              color="secondary"
              variant="outlined"
            >
             <EditIcon/>
            </Button>
          </Box>

          
      </div>
    );
  });

  const completed = tasks.map((task) => {
    if(task.completed === true){
    return (
      <div key={task.id} className='todo'>
      <Checkbox
        style={{paddingTop:'1px'}}
        checked={task.completed}
        onChange={() => handleTaskCompleted(task.id)}
     
      />
          <Box flexGrow={1}>{task.name}</Box>
          <Box mr={2}>
            <Button
              className="submit-edits" title="Delete"
              onClick={() => {
                handleDeleteClick(task.id);
              }}
              variant="outlined"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </Box>
          <Box>
            <Button
              className="submit-edits" title="edit"
              onClick={() => {
                handleOpenDialog(task.id);
              }}
              color="secondary"
              variant="outlined"
            >
             <EditIcon/>
            </Button>
          </Box>

          
      </div>
    );
            }
  });

  const handleClose = () => {
    setOpen(false);
    setUpdatedTaskName("");
  };

  const handleOpenDialog = (taskId) => {
    setSelectedTaskId(taskId);
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      setUpdatedTaskName(taskToUpdate.name);
    }
    setOpen(true);
  };

  const handleUpdateClick = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTaskId) {
        return { ...task, name: updatedTaskName };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleClose();
  };

  function handleDeleteClick(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
  function handleTaskCompleted(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  

  function handleAddClick() {
    const newTask = { id: uuidv4(), name: taskNameInputValue, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div
         className="todo-container"
      >
       <Stack
       className="form"
          sx={{ width: 800, marginTop: "40px" }}
          direction="row"
          spacing={2}
        >
          <TextField
          className="add-task"
            value={taskNameInputValue}
            onChange={(event) => {
              setTaskNameInputValue(event.target.value);
            }}
            label="Task"
            variant="filled"
            focused
          />

          <Button
          className="add-button"
           
            onClick={handleAddClick}
            variant="outlined"
          >
            <AddCircleOutlineOutlinedIcon />
          </Button>
        </Stack>
        <>{taskList}</>
        
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update task Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the task name, please enter the new name below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="New task Name"
            type="text"
            fullWidth
            value={updatedTaskName}
            onChange={(event) => setUpdatedTaskName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateClick}>Update</Button>
        </DialogActions>
      </Dialog>
      <div style={{padding:'15px'}}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Completed</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {completed}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </>
  );
}

export default Tasks;
