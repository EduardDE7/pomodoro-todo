import { useState, useRef } from 'react';
import { Task } from './Task';
import { PlusIcon } from '../assets/icons/PlusIcon';

export const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleOpen = () => {
    setModalOpen(true);
    inputRef.current.focus();
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      name: e.target.task.value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    e.target.task.value = '';
    setModalOpen(false);
  };

  const toggleCompleted = (id) => {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="md:w-2/4 border border-gray-400/30 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between">
        <h2 className="text-2xl mb-6">Todo</h2>
        <div>
          {tasks.length > 0 && <p>Total tasks: {tasks.length}</p>}
          {tasks.length > 0 && (
            <p>
              Completed tasks: {tasks.filter((task) => task.completed).length}
            </p>
          )}
        </div>
      </div>
      <hr className="border-gray-400/30 mb-6" />
      <ul className="flex flex-col gap-3 mb-6">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleCompleted={() => toggleCompleted(task.id)}
            deleteTask={() => deleteTask(task.id)}
          />
        ))}
        {tasks.length === 0 && <li>No tasks</li>}{' '}
      </ul>
      <button
        className="btn btn-block btn-outline btn-info"
        onClick={handleOpen}
      >
        Add task
      </button>
      <dialog
        id="my_modal_1"
        className={`modal ${modalOpen ? 'modal-open' : ''}`}
      >
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">New Task</h3>
          <form className="flex gap-4 py-5" onSubmit={addTask}>
            <input
              type="text"
              name="task"
              ref={inputRef}
              placeholder="Type here"
              className="input input-bordered input-info w-full"
            />
            <button className="btn btn-info btn-square">
              <PlusIcon />
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
