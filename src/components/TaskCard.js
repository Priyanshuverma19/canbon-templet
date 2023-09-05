import React, { useState } from 'react';
import { Button, Col} from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

function TaskCard({
  task,
  handleDelete,
  handleUpdateStatus,
  handleUpdateTitleDescription,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveTitleDescription = () => {
    handleUpdateTitleDescription(task._id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
       <>
       <input
         type="text"
         value={editedTitle}
         onChange={(e) => setEditedTitle(e.target.value)}
       />
       <textarea
         value={editedDescription}
         onChange={(e) => setEditedDescription(e.target.value)}
       />
       <Button variant="success" size="sm" onClick={handleSaveTitleDescription}>Save</Button>
     </>
      ) : (
        <>
        <h3>Title:{task.title}</h3>
        <p>Description:{task.description}</p>
        <Col >
        <Button className='btn' variant="primary" size="sm" onClick={() => setIsEditing(true)}>Update </Button>

        <Button className='btn' variant="danger" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
        <Button className='btn' variant="secondary" size="sm" onClick={() => handleUpdateStatus(task._id, 'doing')}>Move to Doing</Button>
        <Button className='btn' variant="success" size="sm" onClick={() => handleUpdateStatus(task._id, 'done')}>Move to Done</Button>

        
        </Col>
      </>
      )}
      <Toaster />
    </div>
  );
}

export default TaskCard;
