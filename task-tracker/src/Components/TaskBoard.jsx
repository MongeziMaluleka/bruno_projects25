import React from "react";

const STATUSES = ["To Do", "In Progress", "Done"];


/**
 * The TaskBoard component renders a grid of sections, each of which displays a
 * heading with the name of a status and a list of tasks in that status. Each
 * task is rendered as a row with a title, optional notes, and buttons to move
 * the task forward in the statuses list or delete the task.
 *
 * @param {{ tasks: { id: number, title: string, notes: string, status: string }[], onMove: (id: number) => void, onDelete: (id: number) => void }}
 *   tasks The list of tasks to display.
 *   onMove A function to call when a task is moved to the next status.
 *   onDelete A function to call when a task is deleted.
 *
 * @returns A React component that displays the task board.
 */
export default function TaskBoard({ tasks, onMove, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {STATUSES.map(status => (
        <section key={status}
          className="bg-white rounded-xl shadow-lg p-4 min-h-[250px] flex flex-col border-2 border-blue-100"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-3 text-center uppercase">{status}</h2>
          <div className="flex-1 flex flex-col gap-3">
            {tasks.filter(t => t.status === status).length === 0 ? (
              <div className="text-gray-400 text-center my-auto">No tasks</div>
            ) : (
              tasks
                .filter(t => t.status === status)
                .map(task => (
                  <div key={task.id}
                    className="rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 border p-4 shadow flex flex-col"
                  >
                    <div className="font-semibold text-lg mb-1">{task.title}</div>
                    {task.notes && (
                      <div className="text-gray-600 text-sm mb-2">{task.notes}</div>
                    )}

                    <div className="flex gap-2 mt-auto self-end">
                      {!task.status.includes("Done") && (
                        <button
                          className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600 text-sm font-medium"
                          onClick={() => onMove(task.id)}
                        >
                          Move Forward
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 text-sm font-medium"
                        onClick={() => onDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
