import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/users" element={<UserManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
