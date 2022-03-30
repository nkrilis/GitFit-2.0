import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-400 flex justify-between items-center">
      <h1 className="pl-5 font-bold text-4xl">GitFit</h1>
    </header>
  );
};

export default Header;
