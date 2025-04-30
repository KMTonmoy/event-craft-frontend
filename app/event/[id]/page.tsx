'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fakeEvent = {
  id: '1',
  title: 'Tech Conference 2025',
  category: 'Technology',
  image: '/images/tech-event.jpg',
  date: '2025-06-10',
  endTime: '18:00',
  location: 'Ishwardi Auditorium, Pabna',
  description:
    'Join us for the most exciting tech conference of the year! Discover innovations, network with industry leaders, and explore the future of technology.',
  isPaid: true,
  isPrivate: false,
  price: 499,
  organizer: {
    name: 'EventCraft Team',
    contact: 'support@eventcraft.com',
  },
};

const EventDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {fakeEvent.title}
      </motion.h1>

      <motion.div
        className="flex flex-col lg:flex-row gap-8 items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full lg:w-1/2 h-80 md:h-[400px] relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src={fakeEvent.image}
            alt={fakeEvent.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-5 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold text-blue-500">📅 Date:</span>{" "}
            {new Date(fakeEvent.date).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-500">⏰ Ends:</span>{" "}
            {fakeEvent.endTime}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-500">📍 Location:</span>{" "}
            {fakeEvent.location}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-500">💰 Price:</span>{" "}
            {fakeEvent.isPaid ? `৳${fakeEvent.price}` : "Free"}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-500">🔒 Type:</span>{" "}
            {fakeEvent.isPrivate ? "Private" : "Public"}
          </p>
          <p className="text-md">{fakeEvent.description}</p>

          <div className="pt-4 border-t">
            <h3 className="text-xl font-semibold text-blue-600 mb-1">
              🎤 Organizer
            </h3>
            <p>
              <strong>Name:</strong> {fakeEvent.organizer.name}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
