import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="lg:text-9xl md:text-7xl sm:text-5xl text-5xl mb-20">
        GitFit
      </h1>
      
      <p className="lg:text-7xl md:text-5xl sm:text-3xl text-3xl text-teal-600 mb-20">
        Ready to start your fitness Journey?
      </p>
      <Link
        className="py-6 px-6 bg-orange-500 rounded-full text-2xl hover:bg-red-400 transition duration-300 ease-in-out flex items-center animate-bounce"
        to="/signup"
      >
        SIGN UP NOW
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Home;
