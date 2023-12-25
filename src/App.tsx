import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {useSelector} from "react-redux";
import {isUserLoggedIn} from "./store/user/user.slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  }
]);

export function App() {
  const isLogged = useSelector(isUserLoggedIn);

  if (!isLogged) {
    return <Login/>
  }

  return (
      <RouterProvider router={router} />
  );
}
