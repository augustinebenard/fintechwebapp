/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import IdleTime from "./IdleTime";

export const PrivateRoute = ({ path, exact, children }) => {
	const { users } = useSelector((state) => state.verify);
	// Check is user is logged in
	return users ? children : <Navigate to="/" />;
};
