import React from "react";
import logo from "./../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer-container h-[150px] flex justify-around items-center bg-[#f4fff3] w-full">
      <div className="p-[10px]">
        <div className="logo-title flex justify-start items-center">
          <img src={logo} alt="" />
          <h1 className="tagline text-3xl text-[#56b24d]">CALOGEN</h1>
        </div>
        <h6>© 2024 CALOGEN. All rights reserved. Created by Mohamed Fazil.</h6>
      </div>
      <div className="footer-flex">
        <div
          className="title text-black"
          style={{
            fontSize: "70px",
            fontWeight: "900",
          }}
        ></div>
        <div className="socials flex items-center justify-center">
          <div className="m-[20px]">
            <a
              href="https://www.instagram.com/_f4zil_811?igsh=cjZ4aWh5ZXpoZXAz"
              className="flex items-center justify-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png"
                alt="instagram"
              />
            </a>
            <p>Instagram</p>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/mohamed-fazil-985556289">
              <img
                src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                alt="linkedin"
              />
            </a>
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
