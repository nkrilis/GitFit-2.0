import React from "react";

const Footer = () => {
  return (
    <footer className="w-full p-4 mt-auto bg-gradient-to-b from-purple-100 to-purple-200">
      <div className="container mx-auto text-center my-2">
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
