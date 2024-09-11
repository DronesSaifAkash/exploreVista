import React, { useState, useRef } from "react";

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <button
        className="text-blueGray-500 block focus:outline-none"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 rounded-full">
            <img
              alt="User Avatar"
              className="w-full rounded-full"
              src="http://localhost:5000/images/banner/model1.jpg"
            />
          </span>
        </div>
      </button>
      <div
        ref={popoverDropdownRef}
        className={`bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 ${
          dropdownOpen ? "block" : "hidden"
        }`}
        style={{
          position: 'absolute',
          top: '100%', // Adjust to position below the button
          left: '90%', // Align to the left of the button
          transform: 'translateX(-50%)', // Center-align dropdown based on the button width
          width: 'max-content' // Ensures the width adjusts to content
        }}
      >
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => e.preventDefault()}
        >
          Profile
        </a>
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userType");
            window.location.href = "/auth/login";
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
