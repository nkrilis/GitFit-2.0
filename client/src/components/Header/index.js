import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import logo from "../../assets/images/logo.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="flex items-center text-right justify-between flex-wrap p-2 sm:p-4 md:p-5 lg:p-8">
      <Link to="/">
        <div className="flex items-center flex-shrink-0 text-white mr-2">
          <img
            className="object-fill h-24 w-24 lg:h-48 lg:w-48 md:w-36 md:h-36 rounded-full hover:shadow-white shadow-header"
            src={logo}
            alt="logo"
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 sm:flex md:flex lg:flex -mt-5 sm:mt-0 md:mt-0 lg:mt-0">
        <Link
          className="inline-flex items-center pr-3 md:pr-6 lg:pr-9 text-white hover:text-purple-200 pt-0.5"
          to="/exercise"
        >
          Exercises
        </Link>

        {Auth.loggedIn() ? (
          <>
            <Link
              className="inline-flex items-center pr-3 md:pr-6 lg:pr-9 text-white hover:text-purple-200 pt-0.5"
              to="/me"
            >
              Profile
            </Link>
            <button
              className="inline-flex items-center text-white hover:text-purple-200 pt-0.5"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="inline-flex items-center pr-3 md:pr-6 lg:pr-9 text-white hover:text-purple-200 pt-0.5"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex items-center text-white hover:text-purple-200 pt-0.5"
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
