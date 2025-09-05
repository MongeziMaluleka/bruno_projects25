import React from 'react';

/**
 * The TaskCard component renders a card for one task with title, notes, and two action buttons.
 * The "Move Forward" button is only shown if the task is not in the final status.
 *
 * @param {{ task: { id: number, title: string, notes: string, status: string }, onAdvance: (id: number) => void, onDelete: (id: number) => void, isFinal: boolean }}
 *   task The task to render.
 *   onAdvance A function to call when the task is moved forward in the statuses list.
 *   onDelete A function to call when the task is deleted.
 *   isFinal A boolean indicating whether the task is in the final status.
 *
 * @returns A React component that renders the task card.
 */
export default function TaskCard({ task, onAdvance, onDelete, isFinal }) {
  return (
    // Card wrapper
    <div className="rounded bg-gray-50 border p-3 shadow flex flex-col">
      <div className="font-semibold">{task.title}</div>
      {task.notes && <div className="text-gray-600 text-sm mb-2">{task.notes}</div>}
      // Action buttons
      <div className="flex gap-2 mt-auto">
        {!isFinal && (
            // Only show "Move Forward" if not in final status
          <button
            className="bg-green-500 text-white rounded px-2 py-1 hover:bg-green-600"
            onClick={() => onAdvance(task.id)}
          >
            Move Forward
          </button>
        )}
        // Delete button always shown
        <button
          className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
