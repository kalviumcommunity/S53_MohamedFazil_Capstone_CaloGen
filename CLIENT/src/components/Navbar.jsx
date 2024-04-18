import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nav from "../assets/nav.png";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScroll(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${scroll ? "nav-main-div" : ""}`}>
      <div
        className={`navbar ${scroll ? "scroll-nav" : ""} flex justify-evenly items-center`}
      >
        <div className="routes flex justify- items-center part1">
          <img
            src={nav}
            alt=""
            style={{
              width: "86.25px",
              height: "70px",
            }}
          />
          <div className="navlinks flex justify-evenly items-center">
            <Link
              to="/"
              className="px-2 my-1.5 hover:text-customGreen transition duration-300 transform hover:translate-y-0.5 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/gen"
              className="px-2 my-1.5 hover:text-customGreen transition duration-300 transform hover:translate-y-0.5 hover:underline"
            >
              Get Started
            </Link>
            <Link
              to="/meals"
              className="px-2 my-1.5 hover:text-customGreen transition duration-100 transform hover:translate-y-0.5 hover:underline"
            >
              Meals
            </Link>
          </div>
        </div>
        <div className="flex justify-evenly items-center part2">
          <Link
            to="/about"
            className="px-2 my-1.5 hover:text-customGreen transition duration-100 transform hover:translate-y-0.5 hover:underline"
          >
            About
          </Link>
          <button className="px-8 py-1 text-customGreen border-3 border-customGreen rounded-3xl font-bold signinbtn hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
