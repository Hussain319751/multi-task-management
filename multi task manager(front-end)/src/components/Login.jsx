import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showerr, setShowErr] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();
  async function handleSubmit() {
    event.preventDefault();
    if (await authContext.login(username, password)) {
      navigate(`/Welcome/${username}`);
    } else {
      setShowErr(true);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {showerr && <div>wrong auth</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
