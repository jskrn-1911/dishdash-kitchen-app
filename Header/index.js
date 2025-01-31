"use client";

import React, { useState } from "react";
import { useUser } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout } = useUser(); // Retrieve user and logout from context
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    logout(); // Clear user data from context
    localStorage.clear(); // Clear local storage
    router.push("/login"); // Redirect to login
  };

  return (
    <>
      <nav className="bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* {/  Mobile Menu Hamburger Icon  /} */}
            <div className="sm:hidden flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

            <div className="left-side flex items-center lg:gap-[60px] md:gap-[30px] gap-[20px]">
              {/* {/  Logo  /} */}
              <div className="flex items-center">
                {/* <h3 className="text-xl font-bold text-white">DishDash</h3> */}
                <a className="text-xl font-bold text-white" href="/">DishDash</a>
              </div>
              {/* {/ Desktop Navigation Links /} */}
              <div className="hidden sm:flex lg:space-x-6 md:space-x-2 space-x-0">
                <a
                  href="/dashboard"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="/orders"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 text-sm font-medium"
                >
                  Orders
                </a>
                <a
                  href="/settings"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 text-sm font-medium"
                >
                  Settings
                </a>
              </div>
            </div>

            <div className="right-side flex items-center md:gap-[35px] gap-[20px]">
              {/* {/ Add Menu Item Button  /} */}
              <button
                onClick={() => router.push("/add-menu-item")}
                className="hidden sm:inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                <span className="mr-1">+</span> Add Menu Item
              </button>

              {/* Profile Section   */}
              <div className="relative">
                <button
                  className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    // src={user?.profilePicture || "/default-profile.jpg"}
                    src={"https://picsum.photos/200/200"}
                    alt="Profile"
                  />
                </button>
                {isProfileDropdownOpen && (
                  <div className={`absolute right-0 mt-5 w-48  z-10 ${isProfileDropdownOpen ? 'h-[180px]' : 'h-0'}  overflow-y-clip transition-all duration-[0.6s]  ease-in-out`}>
                    <div className=" bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                      <p className="block px-4 py-2 text-sm text-gray-700">
                        {/* {/ Hello, {user?.name || "Guest"} /} */}
                        Hello, Guest
                      </p>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>

        {/* //  Mobile Navigation Links */}
        {isMobileMenuOpen && (
          <div className={`sm:hidden px-2 pt-2 pb-3 space-y-1 ${isMobileMenuOpen ? 'h-[192px]' : 'h-0'}  overflow-y-clip transition-all duration-[0.6s]  ease-in-out  `} id="mobile-menu">
            <a
              href="/dashboard"
              className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="/orders"
              className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
            >
              Orders
            </a>
            <a
              href="/settings"
              className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
            >
              Settings
            </a>
            <button
              onClick={() => router.push("/add-menu-item")}
              className="block w-full text-left text-green-600 hover:bg-gray-700 hover:text-white px-3 py-2 text-base font-medium"
            >
              + Add Menu Item
            </button>
          </div>
        )}
      </nav>
    </>
    
  );
};

export default Header;
