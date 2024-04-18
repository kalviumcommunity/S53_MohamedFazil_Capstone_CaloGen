import React from "react";
import homeIntroImg from "../assets/home-intro-img.png";
import { NavLink } from "react-router-dom";
import religionImage from "../assets/religion.png";
import recipeImage from "../assets/recipes.png";
import caloriesImage from "../assets/calories.png";

const Home = () => {
  const features = [
    {
      image: caloriesImage,
      name: "Calorie Intake Customization",
      description:
        "Users can set daily calorie goals on the website, which generates personalized meal suggestions for breakfast, lunch, and dinner accordingly.",
    },
    {
      image: religionImage,
      name: "Religious Dietary Accommodation",
      description:
        "Our platform respects diverse religious dietary preferences, ensuring cultural adherence while offering a wide range of culinary experiences.",
    },
    {
      image: recipeImage,
      name: "Meal Preparation Assistance",
      description:
        "The website provides recipes for home cooking and suggests nearby restaurants serving the same meals based on dietary needs.",
    },
  ];

  return (
    <div className="home-main-div w-full flex flex-col justify-center items-center">
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
          <p className="mb-[40px]">Enjoy Healthy Consumption with CaloGen</p>
          <NavLink to="/gen">
            <button className="route-button text-white font-semibold py-[10px] px-[40px] rounded-[10px] bg-[#56b24d]">
              Get Started
            </button>
          </NavLink>
        </div>
        <div className="home-flex-2 h-max">
          <NavLink to="/gen">
            <img
              src={homeIntroImg}
              alt=""
              style={{
                height: "34.375rem",
                width: "34.375rem",
              }}
            />
          </NavLink>
        </div>
      </div>
      <div className="home-features-container flex justify-center items-center flex-col text-center ">
        <h1 className="font-bold text-6xl p-3 tracking-wide text-[#4b9b44] ">
          Personalized Meal Plans But Easier
        </h1>
        <p className="home-description-text text-lg p-3 text-slate-800">
          We embrace dietary restrictions and ensure that the suggested food is
          meticulously chosen to align with your safety and preferences.
        </p>
        <div className="home-features-grid grid grid-cols-3 w-[90%]">
          {features.map((feature, i) => {
            return (
              <div
                key={i}
                className="home-features-card flex flex-col items-center justify-center text-center rounded-[10px] m-2 p-3"
              >
                <img src={feature.image} alt="" className="h-36 w-36" />
                <h1 className="font-medium text-2xl p-3 ">{feature.name}</h1>
                <p className="home-description-text font-light w-[85%] text-center text-slate-800 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
