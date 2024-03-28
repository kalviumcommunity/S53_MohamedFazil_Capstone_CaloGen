import React from "react";
import "./App.css";
import BG from "./assets/BG.png";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing";

function App() {
  return (
    <div className="relative">
      <img src={BG} alt="" className="h-screen w-screen fixed z-[-1]" />
      <Navbar />
      <Routing />
    </div>
  );
}

export default App;
