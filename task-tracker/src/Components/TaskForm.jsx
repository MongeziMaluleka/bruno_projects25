// TaskForm.jsx
import React from "react";
import { useTaskForm } from "./useTaskForm";

/**
 * The TaskForm component renders a form for adding a new task. It uses the useTaskForm hook to manage the state
 * of the form fields and validity. The form has two input fields, one for the task title and one for the
 * task notes. The task title is required, and the form will not submit if it is empty. The form has a
 * single submit button which is disabled if the form is not valid.
 *
 * @param {function} onAdd The function to call when the form is submitted with valid data. It is passed the
 * task object as an argument.
 * @returns {JSX.Element} The TaskForm component.
 */
export default function TaskForm({ onAdd }) {
  const {
    title, setTitle,
    notes, setNotes,
    isValid,
    submitWith,
    titleRef,
  } = useTaskForm();

  return (
    // Form wrapper
    <form
      className="flex flex-col gap-2 md:flex-row items-start justify-center md:gap-4 mt-8"
      onSubmit={submitWith(onAdd)}
    >
      <input
      // Task title input
        ref={titleRef}
        className="border rounded p-2 flex-1 text-lg shadow mt-9 min-h-[50px]"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
      // Task notes input
        className="border rounded p-2 flex-1 text-lg shadow mt-9 min-h-[50px]"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
      // Submit button
        className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-lg hover:bg-blue-700 shadow mt-9 min-h-[50px] disabled:opacity-50"
        type="submit"
        disabled={!isValid}
      >
        Add Task
      </button>
    </form>
  );
}
