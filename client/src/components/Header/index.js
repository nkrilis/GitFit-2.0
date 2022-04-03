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
    // <header className="bg-gradient-to-r from-blue-500 to-green-400 mb-4 py-3 flex-row align-center">
    //   <div className="container flex-row justify-space-between-lg justify-center align-center">
    //     <div>
    //       <Link className="text-light" to="/">
    //         <h1 className="m-0">GitFit</h1>
    //       </Link>
    //       <p className="m-0">Get into the mind of a Body Builder.</p>
    //     </div>
    //     <div>
    //       {Auth.loggedIn() ? (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/me">
    //             {Auth.getProfile().data.username}'s profile
    //           </Link>
    //           <button className="btn btn-lg btn-light m-2" onClick={logout}>
    //             Logout
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/login">
    //             Login
    //           </Link>
    //           <Link className="btn btn-lg btn-light m-2" to="/signup">
    //             Signup
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </header>
    <nav className="flex items-center justify-between flex-wrap p-6">
      <Link to="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            className="object-fill h-24 w-24 lg:h-48 lg:w-48 md:w-36 md:h-36  rounded-full hover:shadow-white shadow-lg"
            src={logo}
            alt="logo"
          />
        </div>
      </Link>
      <div className="pr-8 md:block hidden">
        <Link
          className="inline-flex items-center pr-10 text-white"
          to="/exercise"
        >
          Exercises
        </Link>

        {Auth.loggedIn() ? (
          <>
            <Link
              className="inline-flex items-center pr-10 text-white"
              to="/me"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Profile
            </Link>
            <button
              className="inline-flex items-center pr-10 text-white"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="inline-flex items-center pr-10 text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex items-center pr-10 text-white"
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
