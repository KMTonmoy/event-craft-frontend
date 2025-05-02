'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaCalendarAlt,
  FaUser,
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaTag
} from 'react-icons/fa';
import GetUserEmail from '@/hooks/GetUserEmail';

interface Event {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  location: string;
  isPaid: boolean;
  price: number;
  Author: string;
}

interface Invitation {
  id: string;
  accepted: boolean;
  payment_status: string;
  event: Event;
}

interface User {
  id: string;
  email: string;
}

const Invitations = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userEmail = GetUserEmail();
  const [data, setData] = useState<{ data: User } | null>(null);

  useEffect(() => {
    if (userEmail) {
      fetch(`https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`)
        .then((res) => res.json())
        .then((resp) => setData(resp))
        .catch(() => {});
    }
  }, [userEmail]);

  const user = data?.data;

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/invitations/${user?.id}`);
        setInvitations(response.data);
      } catch {
        setError('Error fetching invitations');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchInvitations();
  }, [user?.id]);

  const handleRespond = async (invitationId: string, isPaid: boolean) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/invitations/respond/${invitationId}`, {
        accepted: true,
        payment_status: isPaid ? 'COMPLETED' : 'FREE'
      });
      setInvitations((prev) =>
        prev.map((inv) =>
          inv.id === invitationId ? { ...inv, accepted: true, payment_status: isPaid ? 'COMPLETED' : 'FREE' } : inv
        )
      );
    } catch {}
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 flex items-center justify-center gap-2">
        <FaEnvelopeOpenText /> My Invitations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {invitations.map((invite) => (
          <div
            key={invite.id}
            className="bg-white p-5 shadow-lg rounded-xl border border-purple-100 hover:shadow-xl transition duration-300"
          >
            <img
              src={invite.event.image}
              alt={invite.event.title}
              className="rounded-xl mb-3 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold text-purple-800 mb-2">{invite.event.title}</h3>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              {new Date(invite.event.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FaUser className="text-purple-500" /> {invite.event.Author}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-500" /> {invite.event.location}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FaTag className="text-purple-500" /> {invite.event.category}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <FaMoneyBill className="text-purple-500" /> Price:{' '}
              {invite.event.isPaid ? `৳${invite.event.price}` : 'Free'}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {invite.accepted ? (
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  Accepted
                </span>
              ) : (
                <button
                  onClick={() => handleRespond(invite.id, invite.event.isPaid)}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    invite.event.isPaid
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {invite.event.isPaid ? 'Pay & Accept Invitation' : 'Accept Invitation'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invitations;
