import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center p-4 bg-blue-500">
        <h1 className="text-white text-xl font-bold">SP</h1>
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
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
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Hamburger Menu Items */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-500 p-4">
          <a href="#home" className="text-white py-2">
            Home
          </a>
          <a href="#about" className="text-white py-2">
            About
          </a>
          <a href="#services" className="text-white py-2">
            Services
          </a>
          <a href="#contact" className="text-white py-2">
            Contact
          </a>
        </div>
      )}

      {/* Horizontal Menu */}
      <div className="hidden md:flex justify-center items-center bg-blue-500 py-4">
        <a href="#home" className="text-white mx-4 hover:text-blue-300">
          Home
        </a>
        <a href="#about" className="text-white mx-4 hover:text-blue-300">
          About
        </a>
        <a href="#services" className="text-white mx-4 hover:text-blue-300">
          Services
        </a>
        <a href="#contact" className="text-white mx-4 hover:text-blue-300">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Header;
