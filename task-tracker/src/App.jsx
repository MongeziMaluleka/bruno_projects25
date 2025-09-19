import React, { useState, useEffect } from 'react';
import TaskForm from  './Components/TaskForm';
import TaskBoard from './Components/TaskBoard';

// Define task statuses and localStorage key
const STATUSES = ["To Do", "In Progress", "Done"];
const STORAGE_KEY = "tasks";

/**
 * The main App component, which manages the state of the tasks and renders the form and board.
 *
 * @returns {JSX.Element} The App component.
 */
export default function App() {
  /**
   * The tasks state, which is an array of objects in the form of { id, title, notes, status }.
   *
   * When the component mounts, it gets the tasks from localStorage. If there are no tasks in localStorage,
   * it initializes the tasks state to an empty array.
   */
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /**
   * This useEffect hook is used to save the tasks to localStorage whenever the tasks state changes.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**
   * The addTask function is used to add a new task to the tasks state. It takes an object with title and notes
   * as arguments and adds an id to the object before adding it to the state.
   *
   * @param {{ title: string, notes: string }} task The task object to add.
   */
  function addTask({ title, notes }) {
    setTasks([
      ...tasks,
      { id: Date.now(), title, notes, status: 'To Do' }
    ]);
  }

  /**
   * The moveTask function is used to move a task to the next status in the STATUSES array. If the task is
   * already in the last status, it does not change the status.
   *
   * @param {number} id The id of the task to move.
   */
  function moveTask(id) {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id !== id) return task;
        const idx = STATUSES.indexOf(task.status);
        const nextStatus = STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
        return { ...task, status: nextStatus };
      })
    );
  }

  /**
   * The deleteTask function is used to delete a task from the tasks state.
   *
   * @param {number} id The id of the task to delete.
   */
  function deleteTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white min-h-screen font-sans">
      <header className="bg-transparent border-b border-blue-700 py-5 mb-6 shadow text-center text-3xl font-bold tracking-wide">
        TASK TRACKER
      </header>
      <main className="max-w-6xl mx-auto px-4 pb-10 bg-slate-500 " style={{ borderRadius: '12px' ,marginTop: '101px'}}>
        <TaskForm onAdd={addTask} />
        <TaskBoard tasks={tasks} onMove={moveTask} onDelete={deleteTask} />
      </main>
    </div>
  );
}
