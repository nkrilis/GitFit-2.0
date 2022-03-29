import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-green-600 py-10">
      <h1 className="font-bold text-3xl">GitFit</h1>
      <div className="pr-8 md:block">
        {/* <Link className="inline-flex items-center pr-10" to="/">
          Home Page
        </Link> */}
        {/* <Link className="inline-flex items-center pr-10" to="">
          Sign up/Log in
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
