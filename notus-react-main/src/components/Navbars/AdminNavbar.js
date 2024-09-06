import React from "react";
import { useLocation } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  const location = useLocation();
  
  // Get the current pathname and format it to display in the navbar
  const pathName = location.pathname.split('/').pop(); // Get the last part of the path
  const pageName = pathName.charAt(0).toUpperCase() + pathName.slice(1); // Capitalize the first letter

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {pageName || 'Dashboard'} {/* Default to 'Dashboard' if no pathname */}
          </a>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
