"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDarkMode } from '../app/context/DarkModeContext';
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowdropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-blue-100 text-blue-900"} p-4 shadow-md transition-colors duration-300 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold flex items-center">
          <Link href="/">  <img src="/images/logo.png" alt="Logo" className="h-14 w-14 mr-2 " /> </Link>
          <Link href="/">  <span className="text-2xl font-semibold hidden sm:block ">Fund My Flow</span> </Link>
        </div>
        <div className="flex items-center space-x-4">
          {session && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setShowdropdown(!showdropdown)} id="dropdownDefaultButton" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 " >
                <span className="hidden sm:inline">Welcome {session.user.email}</span>
                <span className="inline sm:hidden">  Welcome {session.user.name || session.user.email.split('@')[0]}</span>
                <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {showdropdown && (
                <div id="dropdown" className="absolute left-[125px] top-full mt-2 bg-gradient-to-r from-teal-100 to-lime-100 text-gray-800 divide-y divide-gray-200 rounded-lg shadow-lg w-44 dark:bg-gray-800 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-300" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <Link href="/" className="relative group"><span className="block px-4 py-2 text-black hover:bg-teal-200 dark:hover:bg-gray-100">Home</span></Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 text-black hover:bg-teal-200 dark:hover:bg-gray-100">  Dashboard  </Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} className="block px-4 py-2 text-black hover:bg-teal-200 dark:hover:bg-gray-100">  Your Page  </Link>
                    </li>
                    <li>
                      <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-black hover:bg-teal-200 dark:hover:bg-gray-100">  Sign out  </button>
                    </li>
                  </ul>
                </div>
              )}
              <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transform transition-transform duration-300 hover:scale-105" onClick={() => signOut()}>Log Out </button>
            </div>
          )}

          {!session && (<>
            <Link href="/" className="relative group"><span className="text-xl font-medium hidden sm:block group-hover:text-blue-500 group-active:text-blue-700 transform transition-transform duration-300 hover:scale-105">Home</span></Link>
            <Link href="/login">  <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transform transition-transform duration-300 hover:scale-105">Sign Up </button>  </Link>
            <Link href="/userlogin">  <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transform transition-transform duration-300 hover:scale-105">Sign In </button>  </Link>
          </>)}
          <button
            onClick={toggleDarkMode}
            className="ml-4 text-xl p-2 rounded-full hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle dark mode">
            {darkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 4.5V2m0 20v-2.5m7.5-7.5H22m-20 0h2.5m13.364 6.364l1.768 1.768m-17.072-17.072l1.768 1.768m0 13.364l-1.768 1.768m17.072-17.072l-1.768 1.768M12 9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>) : (<svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657a9 9 0 01-12.02-12.02A9 9 0 0012 21a9.005 9.005 0 005.657-4.343z" />
              </svg>)}
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;