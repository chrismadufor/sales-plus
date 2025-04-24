"use client";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavLink({
  name,
  icon,
  link,
  approval,
  mobile,
  subs,
}) {
  const userData = useSelector((state) => state.auth.user);
  const location = useLocation();

  // Full pathname like /dashboard/settings
  const pathname = location.pathname;

  // Split into segments
  const segments = pathname.split("/").filter(Boolean); // removes empty strings
  
  const segment = segments[segments.length - 1];

  const isActive =
    (link === "/dashboard/" + segment && name !== "dashboard") ||
    (name === "dashboard" && segment === "dashboard");

  const hasSubmitted = () => {
    if (userData.userType === "consultant") {
      return userData?.accountVerified;
    } else if (userData.userType === "company") {
      return userData?.accountVerified;
    }
  };
  const submitted = hasSubmitted();

  return (
    <div
      className={`${
        (!submitted && approval) ||
        (submitted && name === "registration") ||
        (userData.userType === "consultant" && !userData.subscription && subs)
          ? "hidden"
          : ""
      }`}
    >
      <div
        onClick={() => {
          // dispatch(showNotification(false));
        }}
      >
        <a
          href={link}
          className={`flex md:text-white items-center w-full grey_text ${
            isActive
              ? "xl:border black_text font-semibold xl:border-gray-200 xl:shadow-md xl:rounded-lg"
              : ""
          } ${mobile ? "border-b px-5 py-4 text-sm" : "mb-6 py-2 px-2"}`}
        >
          <p className={`w-5 ${mobile ? "primary_text" : "text-white"}`}>
            <FontAwesomeIcon icon={icon} />
          </p>
          <span className="ml-2 capitalize text-black xl:text-white">
            {name}
          </span>
        </a>
      </div>
    </div>
  );
}
