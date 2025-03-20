import { useState } from 'react';
import InputForm from './components/InputFormProps';
import PrioritySection from './components/PrioritySectionProps';
import { Todo } from './types'; // Import Todo from types.tsx
// import Greeting from './components/Greeting';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEditStart = (todo: Todo) => {
    setEditingTodo(todo); // Set the todo to be edited
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <InputForm
        todos={todos}
        setTodos={setTodos}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
      />
      <PrioritySection
        todos={todos}
        setTodos={setTodos}
        onEditStart={handleEditStart} // Pass the callback
      />

      {/* <Greeting /> */}

    </div>
  );
}

export default App;

