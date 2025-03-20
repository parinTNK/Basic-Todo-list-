import React, { useState } from 'react';
import { Todo } from '../types'; // Import Todo from types.tsx

interface InputFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  editingTodo: Todo | null; // Pass the todo being edited
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>; // Setter for editingTodo
}

const InputForm: React.FC<InputFormProps> = ({ todos, setTodos, editingTodo, setEditingTodo }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low' | ''>(''); // Allow empty priority initially
  const [tags, setTags] = useState<string[]>([]);
  const [deadline, setDeadline] = useState('');

  React.useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setDescription(editingTodo.description);
      setPriority(editingTodo.priority as '' | 'High' | 'Medium' | 'Low');
      setTags(editingTodo.tags);
      setDeadline(editingTodo.deadline);
    } else {
      setText('');
      setDescription('');
      setPriority('');
      setTags([]);
      setDeadline('');
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    const missingFields = [];
    if (!text) missingFields.push('Text');
    if (!priority) missingFields.push('Priority');

    if (missingFields.length > 0) {
      alert(`The following fields are required: ${missingFields.join(', ')}`);
      return;
    }

    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id
          ? { ...todo, text, description, priority, tags, deadline }
          : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setEditingTodo(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        description,
        priority,
        tags,
        deadline,
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    setText('');
    setDescription('');
    setPriority('');
    setTags([]);
    setDeadline('');
  };

  const handleTagToggle = (tag: string) => {
    setTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 container mx-auto md:w-1/2">
      <h2 className="text-xl font-bold mb-4">{editingTodo ? 'Edit Todo' : 'Add a New Todo'}</h2>
      <input
        type="text"
        placeholder="Todo text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <textarea
        placeholder="Todo description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="mb-4">
        <label className="block mb-2 font-bold">Priority:</label>
        <div className="flex flex-row gap-2">
          {['High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p as 'High' | 'Medium' | 'Low')}
              className={`px-4 py-2 rounded ${
                priority === p ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Tags (optional):</label>
        <div className="flex flex-row gap-2 flex-wrap">
          {['Work', 'Personal', 'Shopping', 'Health', 'Home', 'Fitness', 'Learning'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-4 py-2 rounded ${
                tags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Deadline (optional):</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 rounded w-full ${
          editingTodo ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {editingTodo ? 'Submit Edit' : 'Add Todo'}
      </button>
    </div>
  );
};

export default InputForm;