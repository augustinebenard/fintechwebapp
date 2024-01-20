"use client";

import React, { ReactElement } from "react";
// import { usePathname } from "next/navigation";
// import { logo } from "/assets/images";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
// import Image from "next/image";
import {
  Squares2X2Icon,
  UserGroupIcon,
  PencilSquareIcon,
  UserPlusIcon,
  ClipboardDocumentIcon,
  LockClosedIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
// import useAuth from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import {herconomyLogo as logo} from '../../assets/images';
type PropType = {
  show: boolean;
  toggle: () => void;
};

type Links = {
  name: string;
  url: string;
  icon: ReactElement;
};

export default function SideNav({ show, toggle }: PropType) {
  // const { logout } = useAuth();

  const navLinks: Links[] = [
    {
      name: "Dashboard",
      url: "/app/dashboard",
      icon: <Squares2X2Icon width={14} height={14} />,
    },
    {
      name: "Transactions",
      url: "/app/transactions",
      icon: <ClipboardDocumentIcon width={14} height={14} />,
    },
    {
      name: "Manage Users",
      url: "/app/users",
      icon: <UserPlusIcon width={14} height={14} />,
    },
  ];

  const pathname = useLocation().pathname;
  console.log(pathname);
  

  return (
    <>
      <div
        onClick={show ? toggle : undefined}
        className={cn(
          {
            "left-0 lg:after:hidden after:w-screen after:absolute after:-z-10 after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-gray-900 after:opacity-50":
              show,
            "-left-96": !show,
          },
          "fixed shadow bg-primary-500 w-[251px] h-screen lg:sticky lg:left-0 top-0 bottom-0 z-50 lg:z-0 lg:flex flex-col justify-between transition-all ease-in-out duration-350"
        )}
      >
        <div className="h-full  bg-current bg-primary-500">
          <div className="row z-10 top-0 px-3  py-8">
          <img src={logo} alt="LoginImage" width={150} height={100} />
          </div>
          <div className="block  ">
            {navLinks?.map((link, index) => {
              const isActive: boolean = pathname === link.url;
              return (
                <Link
                  className="font-[400] text-[14px]"
                  to={link?.url}
                  key={index++}
                >
                  <div
                    className={cn(
                      `${
                        isActive
                          ? "bg-secondary-100 font-[600] text-secondary-500"
                          : "bg-primary-500 text-primary-900"
                      } 
                      hover:bg-secondary-100 hover:font-[600] hover:text-secondary-500 ease-in-out duration-260 p-3 flex items-center`,
                      {
                        "bg-secondary-100 font-[600] text-secondary-500":
                          pathname.toLowerCase().includes("customers") &&
                          link.name.toLowerCase() === "customers",
                      },
                      {
                        "bg-secondary-100 font-[600] text-secondary-500":
                          pathname.toLowerCase().includes("loan-request") &&
                          link.name.toLowerCase() === "loan request",
                      },
                      {
                        "bg-secondary-100 font-[600] text-secondary-500":
                          pathname
                            .toLowerCase()
                            .includes("loan-applications") &&
                          link.name.toLowerCase() === "loan applications",
                      }
                    )}
                  >
                    <div className="flex w-6 sm:w-8">{link?.icon}</div>
                    <div className="whitespace-nowrap">{link?.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex py-8 h-fit mx-auto">
          <Button
            // onClick={logout}
            className=" bg-transparent cursor-pointer text-red-500 py-0 px-0 h-8"
          >
            <div className="flex">
              <PowerIcon className="w-4 my-auto mr-2 text-red-600" />
              Logout
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
