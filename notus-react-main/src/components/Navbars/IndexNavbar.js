import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  // const isAuthenticated = false; // Change this to your authentication logic
  const isAuthenticated = localStorage.getItem("token") !== null;

  const userType = localStorage.getItem('userType');
  const dashboardUrl = userType === 'admin' ? '/admin/dashboard' : '/user/dashboard';

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Explore Vista
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              {/* DistrictList */}
              <li className="flex items-center">
                <Link
                  to="/districts"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Explore
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/destinations"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Destinations
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/tours"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Tours
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/about-us"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  About Us
                </Link>
              </li>
             
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isAuthenticated ? (
                <>
                  <li className="flex items-center">
                    <Link
                      to={dashboardUrl}
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userType");
                        window.location.href = "/auth/login"; // Redirect to login page after logout
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <Link
                      to="/auth/register"
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/auth/login"
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
