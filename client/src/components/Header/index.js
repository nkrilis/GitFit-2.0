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
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img class="object-fill h-48 w-48" src={logo} alt="logo" />
      </div>
      <div className="pr-8 md:block hidden">
        <Link
          className="inline-flex items-center pr-10 text-white"
          to="/React-Portfolio"
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          About Me
        </Link>
        <Link
          className="inline-flex items-center pr-10 text-white"
          to="Portfolio"
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Portfolio
        </Link>
        <Link
          className="inline-flex items-center pr-10 text-white"
          to="Contact"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact
        </Link>
        <Link className="inline-flex items-center pr-10 text-white" to="Resume">
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
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          Resume
        </Link>
      </div>
    </nav>
  );
};

export default Header;
