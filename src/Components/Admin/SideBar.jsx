import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PiUserSquare } from "react-icons/pi";
import { BiBarChartSquare } from "react-icons/bi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import AddEvents from "./AddEvents";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../Redex/Auth/AdminSlice";

function SideBar() {
  const [open, setOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Menus = [
    {
      title: "Dashboard",
      src: <BiBarChartSquare />,
      path: () => navigate("/admin"),
    },
    {
      title: "Users",
      src: <PiUserSquare />,
      path: () => navigate("/admin"),
      gap: true,
    },
    {
      title: "Add Events",
      src: <FaRegCalendarCheck />,
      onClick: () => setModalOpen(true),
    },
    {
      title: "Logout",
      src: <CiLogout />,
      onClick: () => dispatch(adminLogout()),
    },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AddEvents isOpen={isModalOpen} closeModal={() => setModalOpen(false)} />
      <div className="flex bg-cherry-Red">
        <div className={"flex bg-cherry-Red lg:h-screen"}>
        <div className="dropdown pl-2 pt-2">
          <label
            tabIndex={0}
            className="btn btn-ghost md:hidden"
            onClick={(e) =>
              e.currentTarget.nextElementSibling.classList.toggle("hidden")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu-md dropdown-content mt-3 z-[1] p-2 shadow w-52  bg-indigo-500 text-white hidden"
          >
            {Menus.map((title, index) => (
              <li key={index} className="font-semibold my-2 cursor-pointer"
              onClick={() => {
                if (title.onClick) {
                  title.onClick();
                } else {
                  title.path();
                }
              }}>
                <p
                  className="hover:bg-transparent hover:text-white flex"
                >
                  <span className="pt-1">{title.src}</span>&nbsp;&nbsp;<span>{title.title}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden md:flex h-screen border shadow-md">
        <div
          className={`${open ? "w-72" : "w-20"} ${
            open && "bg-White border"
          } h-20 p-5 pt-6 relative duration-300`}
        >
          <img
            src="/control.png"
            className={`absolute cursor-pointer -right-3 top-7 w-7 border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={handleToggle}
          />
          <div className="flex gap-x-4 items-center justify-center">
            <h1
              className={`font-sans font-black text-indigo-500 text-3xl duration-200${
                !open && "scale-0 hidden"
              }`}
            >
              ADMIN
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-100 items-center gap-x-4 font-bold ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${index === 0 && "bg-light-white"}`}
                onClick={() => {
                  if (Menu.onClick) {
                    Menu.onClick();
                  } else {
                    Menu.path();
                  }
                }}
              >
                <span className="text-2xl">{Menu.src}</span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-sm`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>

    
  );
}

export default SideBar;
