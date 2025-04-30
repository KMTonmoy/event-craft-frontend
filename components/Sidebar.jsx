'use client';
import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaStar,
  FaCogs,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const dashboardLinks = [
    { name: 'My Events', icon: <FaCalendarAlt />, path: '/dashboard/myevents' },
    {
      name: 'Pending Invitations',
      icon: <FaEnvelopeOpenText />,
      path: '/dashboard/invitations',
    },
    {
      name: 'My Reviews',
      icon: <FaStar />,
      path: '/dashboard/reviews',
    },
    { name: 'Settings', icon: <FaCogs />, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex md:z-0 md:w-[300px] z-50 min-h-screen bg-gray-800 text-white">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed lg:static bg-gray-900 w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto overflow-x-hidden`}
      >
        <div className="p-5 text-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-gray-400 text-sm">Manage your account</p>
        </div>

        <nav className="mt-8">
          {dashboardLinks.map(({ name, icon, path }) => (
            <Link
              key={name}
              href={path}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform transform hover:scale-105"
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
