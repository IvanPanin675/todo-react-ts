import { useEffect, useState } from 'react'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

useEffect(() => {
  const storedTodos = localStorage.getItem('todos');
  console.log('loading');
  if (storedTodos) {
    try {
      const parsedTodos: Todo[] = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    } catch (e) {
      console.error("Failed to parse localStorage:", e);
    }
  }
}, []);

  // Збереження в localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('save');
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }
    setTodos([...todos, todo]);
    setNewTodo('');
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
      <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>To-Do List</h1>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a task"
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
                flex: 1
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;