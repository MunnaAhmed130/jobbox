import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="xl:col-span-10 lg:col-span-9  col-span-8">
        <div className="h-full max-w-7xl mx-auto px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
