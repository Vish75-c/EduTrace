import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import SignUp from "./components/SignUp";
function App() {
  return (
    <div className="font-sans">
      <Top/>
      <SignUp/>
      <Bottom/>
    </div>
  );
}

export default App;