import React, { useContext, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useRoutes,
} from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/users";
import Layout from "./components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import routes from "./route/routes";

function App() {
  const isAuthenticated = useSelector((state: any) => state.auth);

  const routing = useRoutes(routes(isAuthenticated.isLoggedIn));
  return (
    <>
      <ToastContainer />
      {routing}
    </>
  );
}

export default App;
