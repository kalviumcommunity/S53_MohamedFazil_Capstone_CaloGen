import React from "react";
import "./App.css";
import BG from "./assets/BG.png";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative">
      <img
        src={BG}
        alt=""
        className="fixed inset-0 z-[-1] pointer-events-none w-full h-full"
      />
      <div className="relative z-10">
        <Routing />
      </div>
    </div>
  );
}

export default App;
