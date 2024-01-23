"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/solid";

type PropType = {
  show: boolean;
  toggle: () => void;
};

export default function Header({ toggle }: PropType) {
  type Links = {
    name: string;
    url: string;
  };

  const navLinks: Links[] = [
    { name: "Dashboard", url: "/app/dashboard" },
    { name: "Transactions", url: "/app/transactions" },
    { name: "Manage Users", url: "/app/users" },
  ];

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  )?.loggedInUser;
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const getUserInitialsFromName = (name: string) => {
    if (!name || name.split(" ").length === 1) {
      return name[0];
    }
    const nameArray = name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[1];
    return firstName[0] + lastName[0];
  };

  const pathname = useLocation().pathname;
  const { fullName, initials } = {
    fullName: loggedInUser.name,
    initials: getUserInitialsFromName(loggedInUser.name),
  };

  useEffect(
    useCallback(() => {
      if (fullName && initials) {
        setUserName(fullName);
        setUserInitials(initials);
      }
    }, []),
    [fullName, initials]
  );

  return (
    <section className="flex justify-between top-0 h-18 lg:h-20 w-full py-4 px-4 bg-white z-40 shadow">
      <div className="flex my-auto">
        <div
          onClick={toggle}
          className="block lg:hidden text-gray-900 scale-125 cursor-pointer"
        >
          <div className="text-red-700 m-auto p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex">
          <h2 className="text-lg m-auto ml-1 text-gray-300 whitespace-nowrap">
            {navLinks?.map((link) => {
              const isActive: boolean = pathname === link.url;
              if (isActive) {
                if (pathname === "/app/dashboard") {
                  return `👋 Hello, ${userName?.toString().split(" ")[0]}`;
                }
                return link?.name;
              }
            })}
          </h2>
        </div>
      </div>
      <div className="flex text-lg ">
        <div className="flex">
          <div className="m-auto">
            <BellIcon color="#B30B15" width={20} height={20} />
          </div>
        </div>
        <div className="flex self-start my-auto">
          <div className="rounded-[50%] bg-secondary-100 w-8 h-8 my-auto mx-2 flex">
            <h2 className="m-auto text-sm font-bold">{userInitials}</h2>
          </div>
          <div className="p-1.5 rounded-[3px] mx-auto text-gray-500 font-[600] text-sm whitespace-nowrap cursor-pointer">
           <h2> {userName}</h2>
           <div className="text-gray-400 text-xs">{loggedInUser.email}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
