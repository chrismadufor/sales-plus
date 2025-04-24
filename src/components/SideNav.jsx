"use client";

import React, { useEffect } from "react";
import NavLink from "./NavLink";
import { useDispatch, useSelector } from "react-redux";
// import { getToken } from "../utils/axios";
// import { setLogout } from "@/redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { navLinks } from "../data/nav";

export default function SideNav() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // console.log(user)
  const role = user.userType;

  // const logout = () => {
  //   dispatch(setLogout(true));
  // };

  useEffect(() => {
    // let token = getToken();
    // if (!token) router.push("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="hidden xl:block">
      <div className="bg-primary text-white fixed left-0 h-full w-56 overflow-y-scroll z-10">
        <div className="h-[70px] flex items-center px-5">
          <h1 className="text-center text-2xl text-white turret font-bold">
            + Sales Plus +
          </h1>
        </div>
        <div className="pt-6 h-full overflow-scroll pb-16">
          {navLinks && (
            <div className="px-5">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  name={link.name}
                  icon={link.icon}
                  link={link.link}
                  role={role}
                  approval={link.needsApproval}
                  subs={link.needsSub}
                />
              ))}
            </div>
          )}
          <div className="primary_bg bottom_side_nav px-5 md:absolute bottom-0 left-0 w-full py-5 border-t">
            <a href="/">
              <div
                // onClick={logout}
                className={`flex text-white items-center w-full py-1 px-2 cursor-pointer grey_text`}
              >
                <FontAwesomeIcon className="" icon={faSignOut} />
                <h1 className="text-white ml-2 capitalize">Logout</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
