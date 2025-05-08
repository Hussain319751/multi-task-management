import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Welcome from "./Welcome";
import Todos from "./Todos";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AuthProvider, { useAuth } from "../security/AuthContext";
import Todo from "./Todo";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuth) {
    return children;
  }
  return <Navigate to="/login" />;
}

const TodoApp = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>

            <Route
              path="/Welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <Todo />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <Todos />
                </AuthenticatedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default TodoApp;
