'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillAlt, FaUsers } from 'react-icons/fa';

const fakeEvents = [
  {
    id: '1',
    title: 'Tech Innovation 2025',
    date: '2025-06-20',
    location: 'Ishwardi Auditorium',
    isPaid: true,
    price: 499,
    attendees: 120,
  },
  {
    id: '2',
    title: 'Free AI Workshop',
    date: '2025-07-05',
    location: 'Pabna High School',
    isPaid: false,
    price: 0,
    attendees: 300,
  },
  {
    id: '3',
    title: 'Startup Meetup',
    date: '2025-08-15',
    location: 'Rajshahi IT Park',
    isPaid: true,
    price: 299,
    attendees: 80,
  },
];

const MyEvents = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">🎉 My Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeEvents.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <FaMapMarkerAlt /> {event.location}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <FaMoneyBillAlt /> {event.isPaid ? `৳${event.price}` : 'Free'}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <FaUsers /> {event.attendees} Attendees
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
