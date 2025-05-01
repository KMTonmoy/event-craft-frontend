'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GetUserEmail from '@/hooks/GetUserEmail';

// Interfaces
interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  image_url?: string;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

interface UserResponse {
  success: boolean;
  message: string;
  data: UserData;
}

const Page = () => {
  const userEmail = GetUserEmail();
  const [data, setData] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/api/v1/users/users/${userEmail}`)
        .then((res) => res.json())
        .then((resp) => setData(resp))
        .catch((err) => console.error('Error fetching user data:', err));
    }
  }, [userEmail]);

  const user = data?.data;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold">👋 Welcome to Your Dashboard</h1>
        <p className="mt-2 text-lg">Here’s a quick overview of your activity and events.</p>
      </div>

      {/* User Info Badges */}
      {user && (
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Image
              src={user.image_url || '/default-avatar.png'}
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full shadow-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Name: {user.full_name}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Email: {user.email}
            </span>
            {user.phone && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Phone: {user.phone}
              </span>
            )}
            {user.address && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Address: {user.address}
              </span>
            )}
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Role: {user.role}
            </span>
            <span className="text-xs text-gray-500">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {/* Banner Image + Text */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          alt="Dashboard Banner"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
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
