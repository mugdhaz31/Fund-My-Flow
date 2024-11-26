"use client";
import React from "react";
import { useDarkMode } from "../app/context/DarkModeContext";

function Footer() {
  const { darkMode } = useDarkMode();
  const currentYear = new Date().getFullYear(); 

  return (
    <div>
      <footer  className={`${ darkMode ? "bg-gray-800 text-gray-100" : "bg-blue-100 text-blue-900" } text-center p-6 mt-auto transition-colors duration-300`}>
        <div className="container mx-auto">
          <p>&copy; {currentYear} Fund My Flow. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className={`${  darkMode  ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-blue-800" }`}>  Privacy Policy</a>
            <a href="#"  className={`${ darkMode  ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-blue-800"  }`}>  Terms of Service</a>
            <a href="#"  className={`${ darkMode ? "text-gray-400 hover:text-white"  : "text-gray-500 hover:text-blue-800"  }`}>  Help</a>
          </div>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"  } mt-2`}> Created by Mugdha Zope</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
