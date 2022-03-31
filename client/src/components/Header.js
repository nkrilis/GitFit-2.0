import React from "react";
import { Link } from "react-router-dom";

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
      <header className="bg-gradient-to-r from-blue-500 to-green-400 flex justify-between items-center">
        <h1 className="pl-5 font-bold text-4xl">GitFit</h1>

        <div className="md:block">
          <Link className="inline-flex items-center pr-10" to="/">
            Home Page
          </Link>
          <div className="inline-flex items-center pr-10">
          {Auth.loggedIn() ? (
            <>
              <Link onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>
            </>
          )}
        </div>
          <Link className="inline-flex items-center pr-10" to="/workout">
            Workouts
          </Link>
        </div>
      </header>
    );
};

export default Header;
