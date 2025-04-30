import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold">EventCraft</p>
                        <p className="text-sm text-gray-400">Connecting people through events</p>
                    </div>

                    <div className="flex flex-wrap justify-center space-x-6 text-sm">
                        <a href="/" className="hover:text-gray-300">Home</a>
                        <a href="/about" className="hover:text-gray-300">About</a>
                        <a href="/events" className="hover:text-gray-300">Events</a>
                        <a href="/contact" className="hover:text-gray-300">Contact</a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-xl hover:text-blue-500" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-xl hover:text-blue-400" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-xl hover:text-pink-400" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-xl hover:text-blue-600" />
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} EventCraft. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
