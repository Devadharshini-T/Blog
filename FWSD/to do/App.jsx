import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, done: false }]);
      setTask("");
    }
  };

  const completeTask = (i) => {
    const t = [...tasks];
    t[i].done = !t[i].done;
    setTasks(t);
  };

  const editTask = (i) => {
    const newTask = prompt("Edit task", tasks[i].text);
    if (newTask) {
      const t = [...tasks];
      t[i].text = newTask;
      setTasks(t);
    }
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>To-Do List</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <span
              onClick={() => completeTask(i)}
              style={{ textDecoration: t.done ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button onClick={() => editTask(i)}>Edit</button>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;