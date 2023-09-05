import React from 'react';
import TaskCard from './TaskCard';

function KanbanColumn({
  title,
  tasks,
  handleDelete,
  handleUpdateStatus,
  handleUpdateTitleDescription,
}) {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          handleDelete={handleDelete}
          handleUpdateStatus={handleUpdateStatus}
          handleUpdateTitleDescription={handleUpdateTitleDescription}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
