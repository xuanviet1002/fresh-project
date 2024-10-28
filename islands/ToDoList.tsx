import { useEffect, useState } from "preact/hooks";
import ToDoItem from "./ToDoItem.tsx";

export default function ToDoList() {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState("");

    // Fetch the todos from the server
    useEffect(() => {
        fetch("/api/todos")
            .then((res) => res.json())
            .then(setTodos)
            .catch(console.error);
      }, []);
    

    // Add a new to-do via the API
    const addTodo = () => {
        if (newTodo.trim()) {
        fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newTodo.trim() }),
        })
            .then((res) => res.json())
            .then(setTodos)
            .catch(console.error);

        setNewTodo("");
        }
    };

     // Delete a to-do by index via the API
    const deleteTodo = (index: number) => {
        fetch("/api/todos", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index }),
        })
            .then(async (res) => {
                const response = await res.json();
                console.log(response);
                
                return response;
            })
            .then(setTodos)
            .catch(console.error);
    };
    
    return (
        <div>
          <div class="mb-4">
            <input
              type="text"
              value={newTodo}
              onInput={(e) => setNewTodo((e.target as HTMLInputElement).value)}
              placeholder="Add a new task"
              class="border px-2 py-1 rounded"
            />
            <button onClick={addTodo} class="bg-blue-500 text-white px-4 py-1 ml-2 rounded">Add</button>
          </div>
    
          <div class="space-y-2">
            {todos.length > 0 && todos.map((todo, index) => (
              <ToDoItem key={index} text={todo} onDelete={() => deleteTodo(index)} />
            ))}
          </div>
        </div>
    );
}