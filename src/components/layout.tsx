import React from "react";
import useToggle from "./useToggle";
import SideNav from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [show, toggle] = useToggle();
  return (
    <div className="flex">
      <SideNav show={show} toggle={toggle} />
      <div className="w-full overflow-x-hidden bg-gray-100">
        <Header show={show} toggle={toggle} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
