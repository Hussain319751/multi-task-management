import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoApp from "./components/TodoApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodoApp></TodoApp>
    </>
  );
}

export default App;
