import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nav from "../assets/nav.png";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "userToken",
    "userName",
    "userReligion",
  ]);

  useEffect(() => {
    if (!cookies.userName) {
      setCookie("userName", "undefined", { path: "/" });
      setCookie("userToken", "undefined", { path: "/" });
      setCookie("userReligion", "undefined", { path: "/" });
    }
  }, []);

  const handleLogout = () => {
    removeCookie("userToken");
    removeCookie("userName");
    removeCookie("userReligion");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 2;
      setScroll(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${scroll ? "nav-main-div" : ""} flex items-center justify-center`}
    >
      <div
        className={`navbar ${scroll ? "scroll-nav" : ""} flex justify-evenly items-center`}
      >
        <div className="routes flex justify-center items-center part1">
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
          {cookies.userName && cookies.userName == "undefined" ? (
            <Link
              to="/signin"
              className="px-8 py-1 text-customGreen border-3 border-customGreen rounded-3xl font-bold signinbtn hover:underline bg-white"
            >
              Sign In
            </Link>
          ) : (
            <p
              className="px-8 py-1 text-customGreen border-3 border-customGreen rounded-3xl font-bold signinbtn hover:underline bg-white"
              onClick={handleLogout}
            >
              Log Out
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
