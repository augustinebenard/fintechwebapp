import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/users";
import Layout from "./components/layout";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/app/dashboard" element={  <Layout><Dashboard /></Layout>} />
          <Route path="/app/users" element={<Layout><UserManagement /></Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
          {!isLoggedIn && <Route  element={<Navigate to="/" />} /> }
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
