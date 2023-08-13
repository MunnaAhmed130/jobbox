import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Navbar />
      <div
        className={` ${
          pathname === "/" ? "max-w-[1600px]" : "max-w-7xl"
        } max-w-[1600px] mx-auto px-5`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
