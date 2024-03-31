import React from "react";
import homeIntroImg from "../assets/home-intro-img.png";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-main-div w-screen flex justify-center items-center">
      <div className="home-content-container flex justify-between items-start w-4/5">
        <div className="home-flex-1 h-max">
          <div className="home-tagline mb-5">
            <h1 className="tagline text-7xl">
              EAT <span className="text-[#56b24d]">HEALTHY</span>
            </h1>
            <h1 className="tagline  text-7xl">
              STAY <span className="text-[#56b24d]">HEALTHY</span>
            </h1>
          </div>
          <p className="mb-[40px]">
            Enjoy Healthy Consumption with CaloGen ... 🥕😁
          </p>
          <NavLink to="/gen">
            <button className="route-button text-white font-semibold py-[10px] px-[40px] rounded-[10px] bg-[#56b24d]">
              Get Started
            </button>
          </NavLink>
        </div>
        <div className="home-flex-2 h-max">
          <img
            src={homeIntroImg}
            alt=""
            style={{
              height: "550px",
              width: "550px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
