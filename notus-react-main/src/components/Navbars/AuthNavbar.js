import React from "react";
import { Link, useLocation } from "react-router-dom";

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation(); // Get the current path

  // Determine if the user is on the login or registration page
  const isLoginPage = location.pathname === "/auth/login";
  const isRegisterPage = location.pathname === "/auth/register";

  // Check if a token exists in localStorage
  const token = localStorage.getItem("token");

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Explore Vista
              {/* Notus React */}
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <PagesDropdown />
              </li>
              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </Link>
              </li>
              {/* Conditional rendering for login/register buttons */}
              {!isLoginPage && !isRegisterPage && !token && (
                <>
                  <li className="flex items-center">
                    <Link
                      className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      to="/auth/login"
                    >
                      <i className="fas fa-sign-in-alt mr-2 text-lg text-blueGray-400" />
                      Login
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      to="/auth/register"
                    >
                      <i className="fas fa-user-plus mr-2 text-lg text-blueGray-400" />
                      Register
                    </Link>
                  </li>
                </>
              )}

              {isLoginPage && (
                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/auth/register"
                  >
                    <i className="fas fa-user-plus mr-2 text-lg text-blueGray-400" />
                    Register
                  </Link>
                </li>
              )}

              {isRegisterPage && (
                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/auth/login"
                  >
                    <i className="fas fa-sign-in-alt mr-2 text-lg text-blueGray-400" />
                    Login
                  </Link>
                </li>
              )}

              {token && (
                <li className="flex items-center">
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/admin/dashboard"
                  >
                    <i className="fas fa-tachometer-alt mr-2 text-lg text-blueGray-400" />
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  
  );
}
