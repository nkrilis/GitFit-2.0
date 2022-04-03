import React from "react";

const Footer = () => {
  return (
    <footer className="w-full p-4 mt-auto bg-gradient-to-r from-blue-500 to-green-400">
      <div className="container mx-auto text-center mb-5">
        <h4 className="text-purple text-xl">
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by the GitFit team.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
