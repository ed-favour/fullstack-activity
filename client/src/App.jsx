import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        // Make a fetch GET request to your API endpoint
        const response = await fetch("http://localhost:3000/api/todos");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Handle the data by updating the state
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTodos();
  }, []);

  // eslint-disable-next-line no-unused-vars
  async function addTodo() {
    try {
      const response = await fetch("http://localhost:3000/api/todos2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "Wash clothes",
          is_completed: false,
        }),
      });

      // get response in json
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();

      // setting data
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div className="place-content-center">
      <h1 className="text-green-500">TODO LIST</h1>
      <form>
        <input type="text" className="border-solid border-black" />
        
      </form>
      <button type="button" onClick={addTodo}>ADD</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" /> {todo.task}{" "}
            <button type="button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
