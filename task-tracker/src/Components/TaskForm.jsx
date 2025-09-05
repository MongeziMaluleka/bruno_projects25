import React, { useState } from 'react';

// Form to add a new task with title and optional notes
export default function TaskForm({ onAdd }) {
  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    // Prevent adding empty titles
    if (!title.trim()) return;
    onAdd({
      // Trim whitespace from inputs
      title: title.trim(),
      notes: notes.trim()
    });
    // Clear form after submission
    setTitle('');
    setNotes('');
  }
// Form layout with Tailwind styling
  return (
    <form className="flex flex-col gap-2 md:flex-row items-start justify-center mb-8" onSubmit={handleSubmit}>
      <input
        className="border rounded p-2 flex-1 text-lg shadow"
        placeholder="Task title (required)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        className="border rounded p-2 flex-1 text-lg shadow"
        placeholder="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-lg hover:bg-blue-700 shadow"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}
