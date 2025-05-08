import React, { useEffect, useState } from "react";
import { deleteTodoApi, retriveTodosApi } from "../api/TodoapiService copy";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  // Fetch all todos
  const refreshTodos = () => {
    retriveTodosApi(username)
      .then((res) => {
        setTodos(res.data);
        console.log(res);
      })
      .catch((err) => console.error("Failed to retrieve todos:", err));
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const deleteTodo = (id) => {
    deleteTodoApi(username, id)
      .then(() => refreshTodos())
      .catch((err) => console.log("Delete failed:", err));
  };

  const updateTodo = (id) => {
    navigate(`/todo/${id}`);
  };

  const createTodo = () => {
    navigate("/todo/-1");
  };

  return (
    <>
      <div className="container mt-3">
        <h2>Todo List</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Is Done</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No todos found.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.isDone ? "Yes" : "No"}</td>
                  <td>{new Date(todo.targetDate).toDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          <button onClick={createTodo} className="btn btn-success m-3">
            new todo
          </button>
        </div>
      </div>
    </>
  );
};

export default Todos;
