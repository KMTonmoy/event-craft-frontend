'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';  

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string>('home');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
    };

    const closeModals = () => {
        setIsLoginModalOpen(false);
        setIsSignUpModalOpen(false);
    };

    return (
        <motion.nav
            className="bg-white shadow-md sticky top-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    EventCraft
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link
                        href="/"
                        className={`font-medium ${activeLink === 'home' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                        onClick={() => setActiveLink('home')}
                    >
                        Home
                    </Link>
                    <Link
                        href="/events"
                        className={`font-medium ${activeLink === 'events' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                        onClick={() => setActiveLink('events')}
                    >
                        Events
                    </Link>
                    <Link
                        href="/about"
                        className={`font-medium ${activeLink === 'about' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                        onClick={() => setActiveLink('about')}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={`font-medium ${activeLink === 'contact' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                        onClick={() => setActiveLink('contact')}
                    >
                        Contact
                    </Link>
                </div>

                <div className="hidden md:flex space-x-4">
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
                </div>

                <div className="md:hidden flex items-center">
                    <button className='text-2xl' onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <IoMdClose />
                            </motion.div>
                        ) : (
                            <GiHamburgerMenu />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 px-4 py-3"
                    initial={{ opacity: 0, x: '-100%' }}  
                    animate={{ opacity: 1, x: 0 }}  
                    exit={{ opacity: 0, x: '100%' }}  
                    transition={{ duration: 0.5 }}
                >
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className={`block ${activeLink === 'home' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                            onClick={() => setActiveLink('home')}
                        >
                            Home
                        </Link>
                        <Link
                            href="/events"
                            className={`block ${activeLink === 'events' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                            onClick={() => setActiveLink('events')}
                        >
                            Events
                        </Link>
                        <Link
                            href="/about"
                            className={`block ${activeLink === 'about' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                            onClick={() => setActiveLink('about')}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`block ${activeLink === 'contact' ? 'text-blue-600 underline' : 'hover:text-blue-600'}`}
                            onClick={() => setActiveLink('contact')}
                        >
                            Contact
                        </Link>

                        <div className="flex flex-col space-y-4 mt-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 w-full"
                                onClick={openLoginModal}
                            >
                                Login
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full"
                                onClick={openSignUpModal}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {isLoginModalOpen && <LoginModal closeModals={closeModals} openSignUpModal={openSignUpModal} />}
            {isSignUpModalOpen && <SignUpModal closeModals={closeModals} openLoginModal={openLoginModal} />}
        </motion.nav>
    );
};

export default Navbar;
