import React from "react";
import homeIntroImg from "../assets/home-intro-img.png";
import { NavLink } from "react-router-dom";
import religionImage from "../assets/religion.png";
import dietImage from "../assets/diet.png";
import recipeImage from "../assets/recipes.png";
import caloriesImage from "../assets/calories.png";

const Home = () => {
  const features = [
    {
      image: caloriesImage,
      name: "Calorie Intake Customization",
      description:
        "Users can set their daily calorie intake goals within the website. Based on the specified calorie target, the website generates personalised meal suggestions for breakfast, lunch, and dinner.",
    },
    {
      image: dietImage,
      name: "Dietary Restriction Management",
      description:
        "Users can select from a dropdown list of common allergies or dietary restrictions. The website provides meal suggestions that adhere to the chosen restrictions, ensuring a safe and suitable diet plan.",
    },
    {
      image: religionImage,
      name: "Religious Dietary Accommodation",
      description:
        "Users can specify their religious preferences, and the website incorporates religious dietary restrictions into meal suggestions.Our platform respects diverse cultural practices, prioritizing adherence to religious dietary restrictions while offering a rich variety of culinary experiences.",
    },
    {
      image: recipeImage,
      name: "Meal Preparation Assistance",
      description:
        "The website offers recipes and cooking instructions for suggested meals, enabling users to prepare their meals at home. For users unable to cook, the website suggests nearby restaurants that serve meals compliant with their dietary needs and calorie goals, leveraging location-based search capabilities.",
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
        <h1 className="font-bold text-5xl p-3 tracking-wide text-[#4b9b44] ">
          Making Meal Plans Personalized for You Has Never Been Easier
        </h1>
        <p className="font-medium text-xl p-3 ">
          We embrace dietary restrictions and ensure that the suggested food is
          meticulously chosen to align with your safety and preferences.
        </p>
        <div className="home-features-grid grid grid-cols-2 w-[80%]">
          {features.map((feature, i) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center bg-[#55ac4d] rounded-[10px] m-2 p-3"
              >
                <img
                  src={feature.image}
                  alt=""
                  className="h-36 w-36 bg-white rounded-[20px] p-1"
                />
                <h1 className="font-medium text-2xl p-3 underline text-white">
                  {feature.name}
                </h1>
                <p className=" font-light w-[80%]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
