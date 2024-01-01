import React from 'react';
import { classNames } from '../utils/classNames';

export const Task = ({ task, deleteTask, toggleCompleted }) => {
  return (
    <li className="flex justify-between gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
        className="checkbox checkbox-success"
      />
      <p
        className={classNames(
          'text-lg flex-1 w-10 overflow-hidden',
          task.completed ? 'line-through decoration-green-700' : ''
        )}
      >
        {task.name}
      </p>

      <button className="btn btn-sm btn-outline btn-error" onClick={deleteTask}>
        Delete
      </button>
    </li>
  );
};
