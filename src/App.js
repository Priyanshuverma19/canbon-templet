import React, { useState, useEffect } from "react";
import "./App.css";
import "./Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-hot-toast";

import { Container, Row, Col, Button } from "react-bootstrap";
import KanbanColumn from "./components/KanbanColumn";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const handleAddTask = async () => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status: selectedStatus }),
    });

    if (response.ok) {
      fetchTasks();
      setTitle("");
      setDescription("");
      toast.success("add task Successfully");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleUpdateTitleDescription = async (
    taskId,
    newTitle,
    newDescription
  ) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });

    if (response.ok) {
      fetchTasks();
    }
    toast.success("task updated successfully");
  };

  const handleDelete = async (taskId) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks();
    }
    toast.error("Task deleted successfully");
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      fetchTasks();
    }
  };

  return (
    
      <Container  fluid >
        <Row className="addtask">
          <Col xs={12}>
            <div className="add-task-form">
              <h2>Add New Task</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div>
                <label>Status:</label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="todo"
                    checked={selectedStatus === "todo"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  To Do
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="doing"
                    checked={selectedStatus === "doing"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  Doing
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="done"
                    checked={selectedStatus === "done"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  Done
                </label>
              </div>
              <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4}>
            <KanbanColumn
              title="To Do"
              tasks={tasks.filter((task) => task.status === "todo")}
              handleDelete={handleDelete}
              handleUpdateStatus={handleUpdateStatus}
              handleUpdateTitleDescription={handleUpdateTitleDescription}
            />
          </Col>
          <Col xs={12} md={4}>
            <KanbanColumn
              title="Doing"
              tasks={tasks.filter((task) => task.status === "doing")}
              handleDelete={handleDelete}
              handleUpdateStatus={handleUpdateStatus}
              handleUpdateTitleDescription={handleUpdateTitleDescription}
            />
          </Col>

          <Col xs={12} md={4}>
            <KanbanColumn
              title="Done"
              tasks={tasks.filter((task) => task.status === "done")}
              handleDelete={handleDelete}
              handleUpdateStatus={handleUpdateStatus}
              handleUpdateTitleDescription={handleUpdateTitleDescription}
            />
          </Col>
        </Row>
      </Container>
 
  );
}

export default App;
