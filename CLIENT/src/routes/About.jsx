import React from "react";
import ME from "../assets/me.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="about-container p-4 m-2 w-[92%]">
        <div className="flex justify-around items-stretch font my-[40px]">
          <div className="text-lg p-2 w-[60%]">
            <h1 className="text-6xl">
              About <span className="text-[#56B24E]">CALOGEN</span>
            </h1>
            <h4 className="mt-[10%] tracking-wide">
              This platform revolutionizes meal planning by offering
              personalized meal plans that cater to individual dietary needs and
              preferences, ensuring every bite aligns perfectly with your
              tastes. With customizable calorie intake options, users can set
              daily goals for breakfast, lunch, and dinner, empowering them to
              achieve their nutritional objectives effortlessly. We also
              prioritize accommodating diverse religious dietary preferences,
              respecting cultural norms while providing a wide array of culinary
              experiences. Additionally, our platform offers valuable meal
              preparation assistance with a vast selection of recipes tailored
              to specific dietary needs, making home cooking both easy and
              enjoyable. Whether you're aiming to lose weight, adhere to
              religious dietary restrictions, or simply eat healthier, our
              platform provides the tools and support you need to succeed on
              your culinary journey.
            </h4>
          </div>
          <div className="text-center">
            <img
              src={ME}
              alt=""
              className="gen-meal-card p-1 rounded-[15px] bg-white border-[3px]"
              style={{
                maxWidth: "350px",
              }}
            />
            <h1 className="py-3 text-lg">
              Mohamed Fazil, Creator/Developer (
              <span className="text-[#56B24E]">CALOGEN</span>)
            </h1>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h1 className="font-bold text-6xl p-3  text-center tracking-wide text-[#4b9b44]">
          Join Now!
        </h1>
        <p className="home-description-text text-lg p-3 text-slate-800">
          Create a Free Account Today
          <Link
            to="/signin"
            className="mx-4 px-8 py-2 text-customGreen border-3 border-customGreen rounded-3xl font-bold signinbtn hover:underline bg-white"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default About;
