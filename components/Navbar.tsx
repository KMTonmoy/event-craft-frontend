'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import GetUserEmail from '@/hooks/GetUserEmail';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('home');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const userEmail = GetUserEmail();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <motion.nav
      className="bg-white shadow-md z-50 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EventCraft
        </Link>

        {/* Desktop Nav */}
        {/* <div className="hidden md:flex space-x-6">
          {['home', 'events', 'about', 'contact'].map((route) => (
            <Link
              key={route}
              href={route === 'home' ? '/' : `/${route}`}
              className={`font-medium capitalize ${
                activeLink === route
                  ? 'text-blue-600 underline'
                  : 'hover:text-blue-600'
              }`}
              onClick={() => setActiveLink(route)}
            >
              {route}
            </Link>
          ))}
        </div> */}


<div className="hidden md:flex space-x-6">
  {['home', 'events', 'about', 'contact'].map((route) => (
    <Link
      key={route}
      href={route === 'home' ? '/' : `/${route}`}
      className={`font-medium capitalize ${
        activeLink === route
          ? 'text-blue-600 underline'
          : 'hover:text-blue-600'
      }`}
      onClick={() => setActiveLink(route)}
    >
      {route}
    </Link>
  ))}

  {userEmail && (
    <Link
      href="/dashboard"
      className={`font-medium capitalize ${
        activeLink === 'dashboard'
          ? 'text-blue-600 underline'
          : 'hover:text-blue-600'
      }`}
      onClick={() => setActiveLink('dashboard')}
    >
      Dashboard
    </Link>
  )}
</div>


        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          {userEmail ? (
            <button
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                onClick={openLoginModal}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={openSignUpModal}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-2xl" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 px-4 py-3 z-50"
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          {/* <div className="space-y-4">
            {['home', 'events', 'about', 'contact'].map((route) => (
              <Link
                key={route}
                href={route === 'home' ? '/' : `/${route}`}
                className={`block font-medium capitalize ${
                  activeLink === route
                    ? 'text-blue-600 underline'
                    : 'hover:text-blue-600'
                }`}
                onClick={() => {
                  setActiveLink(route);
                  toggleMobileMenu();  
                }}
              >
                {route}
              </Link>
            ))}

            {userEmail ? (
              <button
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-4 mt-4">
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  onClick={openLoginModal}
                >
                  Login
                </button>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={openSignUpModal}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div> */}


<div className="space-y-4">
  {['home', 'events', 'about', 'contact'].map((route) => (
    <Link
      key={route}
      href={route === 'home' ? '/' : `/${route}`}
      className={`block font-medium capitalize ${
        activeLink === route
          ? 'text-blue-600 underline'
          : 'hover:text-blue-600'
      }`}
      onClick={() => {
        setActiveLink(route);
        toggleMobileMenu();
      }}
    >
      {route}
    </Link>
  ))}

  {userEmail && (
    <Link
      href="/dashboard"
      className={`block font-medium capitalize ${
        activeLink === 'dashboard'
          ? 'text-blue-600 underline'
          : 'hover:text-blue-600'
      }`}
      onClick={() => {
        setActiveLink('dashboard');
        toggleMobileMenu();
      }}
    >
      Dashboard
    </Link>
  )}
</div>


        </motion.div>
      )}

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal
          closeModals={closeModals}
          openSignUpModal={openSignUpModal}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          closeModals={closeModals}
          openLoginModal={openLoginModal}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;
