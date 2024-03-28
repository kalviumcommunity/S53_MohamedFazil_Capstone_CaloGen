import { Route, Routes } from "react-router-dom";
import React from "react";
import Generator from "../routes/Generator";
import Meals from "../routes/Meals";
import Home from "../routes/Home";
import About from "../routes/About";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gen" element={<Generator />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Routing;
