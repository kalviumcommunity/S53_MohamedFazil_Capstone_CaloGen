import React from "react";
import logo from "./../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer-container h-[95px] flex flex-col justify-center items-center bg-[#f4fff3] w-full">
      <div className="logo-title flex justify-start items-center">
        <img
          src={logo}
          alt=""
          // style={{
          //   width: "86.25px",
          //   height: "70px",
          // }}
        />
      </div>
      <h6 className="">
        © 2024 CALOGEN. All rights reserved. Created by Mohamed Fazil.
      </h6>
    </div>
  );
};

export default Footer;
