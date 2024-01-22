import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Squares2X2Icon,
  UserPlusIcon,
  ClipboardDocumentIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import { useLocation } from "react-router-dom";
import { herconomyLogo as logo } from "../../assets/images";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth.slice";
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
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
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

  // remove the manage users link if the logged in user is not an admin
  if (loggedInUser?.loggedInUser?.role !== "Admin") {
    navLinks.splice(2, 1);
  }

  const pathname = useLocation().pathname;

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
                          pathname.toLowerCase().includes("users") &&
                          link.name.toLowerCase() === "manage users",
                      },
                      {
                        "bg-secondary-100 font-[600] text-secondary-500":
                          pathname.toLowerCase().includes("transactions") &&
                          link.name.toLowerCase() === "transactions",
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

        <div className="logout_sidebar_button">
          <a className="menu-link">
            <div
              onClick={() => dispatch(authActions.logout())}
              className="flex cursor-pointer py-4 items-center space-x-2"
            >
              <PowerIcon className="w-4 my-auto  text-red-600" />
              <span className="sidebar-text-label font-[500] text-[16px] text-red-600">
                Logout
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
