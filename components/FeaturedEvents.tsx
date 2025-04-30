'use client';

import React, { useEffect, useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaLock, FaTag, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

interface EventType {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  endTime: string;
  location: string;
  isPaid: boolean;
  isPrivate: boolean;
  price: number;
}

const formatStartDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const formatEndTime = (timeStr: string) => {
  if (!timeStr) return 'TBD';
  const time = new Date(`1970-01-01T${timeStr}`);
  return time.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
};

const FeaturedEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    axios.get('./featuredEvents.json').then((res) => {
      const allEvents = res.data as EventType[];

      if (jwt) {
        const upcomingEvents = allEvents.filter((event) => isUpcoming(event.date));
        const randomEvents = shuffle(upcomingEvents).slice(0, 6);
        setEvents(randomEvents);
      } else {
        const publicEvents = allEvents.filter((event) => !event.isPrivate && isUpcoming(event.date));
        const randomPublicEvents = shuffle(publicEvents).slice(0, 3);
        setEvents(randomPublicEvents);
      }
    });
  }, []);

  const isUpcoming = (date: string) => new Date(date) >= new Date();

  const shuffle = (array: EventType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🌟 Featured Events</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => {
          const upcoming = isUpcoming(event.date);
          const isPrivate = event.isPrivate;

          let buttonText = '';
          let disabled = false;

          if (!upcoming) {
            buttonText = 'Event Ended';
            disabled = true;
          } else if (isPrivate) {
            buttonText = event.isPaid ? 'Request & Pay' : 'Request to Join';
          } else {
            buttonText = event.isPaid ? 'Buy Ticket' : 'Join Event';
          }

          return (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{event.category}</p>

                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaClock className="text-blue-500" />
                  <span>Starts: {formatStartDateTime(event.date)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaClock className="text-blue-500" />
                  <span>Ends around: {formatEndTime(event.endTime)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaTag className="text-blue-500" />
                  <span>{event.isPaid ? `৳${event.price}` : 'Free'}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={disabled}
                    className={`px-4 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                      disabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>

                <p className="text-xs mt-2 flex items-center gap-1">
                  {isPrivate ? (
                    <>
                      <FaLock className="text-red-500" /> Private Event - Approval Required
                    </>
                  ) : (
                    <>
                      <FaUsers className="text-green-500" /> Public Event
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedEvents;
