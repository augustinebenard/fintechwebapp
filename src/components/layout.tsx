import React from 'react'
import useToggle from './useToggle';
import SideNav from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [show, toggle] = useToggle();
  return (
    <div className="flex">
    <SideNav show={show} toggle={toggle} />
    <div className="w-full bg-gray-100">
      <Header show={show} toggle={toggle} />
      {/* {children} */}
    </div>
  </div>
  )
}

export default Layout