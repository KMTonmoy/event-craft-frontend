'use client';
import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold">👋 Welcome to Your Dashboard</h1>
        <p className="mt-2 text-lg">Heres a quick overview of your activity and events.</p>
      </div>

      {/* Banner Image + Text */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dashboard Banner"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Engaged with Your Community</h2>
          <p className="text-gray-600 text-lg">
            Participate in events, connect with others, and make an impact. Your dashboard helps you manage everything in one place with ease.
          </p>
        </div>
      </div>

      {/* Tips or Announcements */}
      <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">📢 Latest Tips</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Join events early to avoid missing spots.</li>
          <li>Leave reviews after attending to help organizers improve.</li>
          <li>Check your invitations regularly for new opportunities.</li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
