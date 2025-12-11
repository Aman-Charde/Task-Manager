import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // ✅ Vite environment variable (REACT_APP_ NOT ALLOWED)
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`);
      console.log("API Response:", res.data); // Debug
      setTasks(res.data);
    } catch (err) {
      console.error("GET ERROR:", err);
      setTasks([]); // Prevents map error
    }
  };

  // Create Task
  const createTask = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/tasks`, form);
    setForm({ title: "", description: "" });
    getTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    getTasks();
  };

  // Toggle Pending/Completed
  const toggleStatus = async (task) => {
    await axios.put(`${API_URL}/api/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>Task Manager</h1>

      {/* Form */}
      <form onSubmit={createTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{
            padding: "12px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#f1f1f1",
            color: "#222",
            fontSize: "15px",
          }}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            padding: "12px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#f1f1f1",
            color: "#222",
            fontSize: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#444",
            color: "white",
            cursor: "pointer",
            borderRadius: "8px",
            fontSize: "16px",
            border: "none",
          }}
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p style={{ color: "#ccc" }}>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #333",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: task.status === "completed" ? "#d2ffd2" : "#ffffff",
              color: "#222",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                margin: "0 0 10px",
                fontWeight: "700",
                color: "#000",
              }}
            >
              {task.title}{" "}
              <span style={{ fontSize: "14px", color: "#555" }}>
                ({task.status})
              </span>
            </h2>

            <p style={{ fontSize: "15px", color: "#444" }}>
              {task.description || "No description provided."}
            </p>

            <button
              onClick={() => toggleStatus(task)}
              style={{
                padding: "8px 14px",
                marginRight: "10px",
                cursor: "pointer",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              Toggle Status
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                padding: "8px 14px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
