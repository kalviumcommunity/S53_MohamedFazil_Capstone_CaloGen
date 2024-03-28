import React from "react";
import { Link } from "react-router-dom";
import nav from "../assets/nav.png";

const Navbar = () => {
  return (
    <div className="navbar flex justify-evenly items-center">
      <div className="routes flex justify-evenly items-center part1">
        <img
          src={nav}
          alt=""
          style={{
            width: "87.6px",
            height: "69px",
          }}
        />
        <div className="navlinks flex justify-evenly items-center">
          <Link
            to="/"
            className="px-2 my-1.5 hover:text-customGreen transition duration-300 transform hover:translate-y-0.5"
          >
            Home
          </Link>
          <Link
            to="/gen"
            className="px-2 my-1.5 hover:text-customGreen transition duration-300 transform hover:translate-y-0.5"
          >
            Get Started
          </Link>
          <Link
            to="/meals"
            className="px-2 my-1.5 hover:text-customGreen transition duration-100 transform hover:translate-y-0.5"
          >
            Meals
          </Link>
        </div>
      </div>
      <div className="flex justify-evenly items-center part2">
        <Link
          to="/about"
          className="px-2 my-1.5 hover:text-customGreen transition duration-100 transform hover:translate-y-0.5"
        >
          About
        </Link>
        <button className="px-8 py-1 text-customGreen border-3 border-customGreen rounded-3xl font-bold signinbtn">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
