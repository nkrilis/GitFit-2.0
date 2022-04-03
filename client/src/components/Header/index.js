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
      <Link to="/">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img class="object-fill h-48 w-48" src={logo} alt="logo" />
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
