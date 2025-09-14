import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Section from "./components/Section";
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<><Landing/></>
    },
    {
      path:'/SignIn',
      element:<><SignIn/></>
    },
    {
      path:'/SignUp',
      element:<><SignUp/></>
    },{
      path:'/Section',
      element:<><Section/></>
    }
  ])
  return (
    <><RouterProvider router={router}/></>
  );
}

export default App;