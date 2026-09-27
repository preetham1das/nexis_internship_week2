import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text: trimmedTask, done: false },
    ]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <div className="page-card todo-card">
      <span className="eyebrow">Daily focus</span>
      <h1>My Tasks</h1>

      <div className="task-input-row">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-task">No tasks yet. Add your first one.</li>
        ) : (
          tasks.map((item) => (
            <li
              key={item.id}
              className={item.done ? "task-item done" : "task-item"}
              onClick={() => toggleTask(item.id)}
            >
              <span>{item.text}</span>
              <span className="task-status">{item.done ? "Done" : "Open"}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;