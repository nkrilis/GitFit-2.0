import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-400 flex justify-between items-center">
      <h1 className="pl-5 font-bold text-4xl">GitFit</h1>

      <div className="md:block">
        <Link className="inline-flex items-center pr-10" to="/">
          Home Page
        </Link>
        <Link className="inline-flex itmes-center pr-10" to="/signup">
          Sign up/Log in
        </Link>
        <Link className="inline-flex items-center pr-10" to="/account">
          Account details
        </Link>
      </div>
    </header>
  );
};

export default Header;
