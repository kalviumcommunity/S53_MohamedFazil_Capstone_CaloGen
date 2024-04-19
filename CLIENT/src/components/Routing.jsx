import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Generator from "../routes/Generator";
import Meals from "../routes/Meals";
import Home from "../routes/Home";
import About from "../routes/About";
import Auth from "../routes/Auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Routing = () => {
  const location = useLocation();

  const shouldRenderNavbarAndFooter = () => {
    const hiddenRoutes = ["/signin"];
    const currentPath = location.pathname;
    return !hiddenRoutes.includes(currentPath);
  };

  return (
    <>
      {shouldRenderNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gen" element={<Generator />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Auth />} />
      </Routes>
      {shouldRenderNavbarAndFooter() && <Footer />}
    </>
  );
};

export default Routing;
