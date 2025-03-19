import React from 'react';
import { Todo } from '../types'; // Import Todo from types.tsx

interface PrioritySectionProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onEditStart: (todo: Todo) => void; // Add a callback to trigger editing in InputForm
}

const PrioritySection: React.FC<PrioritySectionProps> = ({ todos, setTodos, onEditStart }) => {
  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-around bg-gray-100 p-4 rounded container mx-auto">
      {['High', 'Medium', 'Low'].map((priority) => (
        <div key={priority} className="md:w-2/5 w-full">
          <h2 className="text-xl font-bold mb-4 text-center">{priority} Priority</h2>
          <div className="flex flex-col gap-4">
            {todos
              .filter((todo) => todo.priority === priority)
              .map((todo) => (
                <div key={todo.id} className="bg-white p-4 rounded shadow">
                  <p className="font-bold">{todo.text}</p>
                  <p className="text-sm text-gray-500">{todo.description}</p> {/* Display description */}
                  <p className="text-sm text-gray-500">Tags: {todo.tags.join(', ')}</p>
                  <p className="text-sm text-gray-500">Deadline: {todo.deadline}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEditStart(todo)} // Ensure this triggers the callback
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrioritySection;