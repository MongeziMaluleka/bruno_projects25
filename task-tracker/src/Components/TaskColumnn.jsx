import React from 'react';
import TaskCard from '..Components/TaskCard';

// Renders all tasks for one status (column)
export default function TaskColumn({ title, tasks, onAdvance, onDelete, isFinal }) {
  return (
    <section className="bg-white rounded-lg shadow p-4 min-h-[250px] flex flex-col">
        // Column title
      <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
      // Task list or "No tasks" message
      <div className="flex-1 flex flex-col gap-2">
        {tasks.length === 0 ? (
            // No tasks message
          <div className="text-gray-400 text-center">No tasks</div>
        ) : (
            // Map over tasks, rendering TaskCard for each
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onAdvance={onAdvance}
              onDelete={onDelete}
              isFinal={isFinal}
            />
          ))
        )}
      </div>
    </section>
  );
}
