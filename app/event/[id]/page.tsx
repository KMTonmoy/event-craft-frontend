"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define the interface for the event data
interface Event {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  location: string;
  isPaid: boolean;
  isPrivate: boolean;
  price: number;
  Author: string;
  visibility: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(
        `https://event-craft-serv.vercel.app/api/v1/event/events/${id}`
      );
      const data = await res.json();
      setEvent(data.data);
    };

    if (id) fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-20">Loading...</p>;

  // Logic for rendering the button text based on the event type
  const renderButton = () => {
    if (event.isPrivate) {
      return (
        <button className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
          Request to Join
        </button>
      );
    }

    if (event.isPaid) {
      return (
        <button className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition duration-300">
          Join → Payment Flow
        </button>
      );
    }

    return (
      <button className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition duration-300">
        Join → Instant Acceptance
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {event.title}
      </motion.h1>

      <motion.div
        className="flex flex-col lg:flex-row gap-8 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full lg:w-1/2 h-80 md:h-[400px] relative rounded-xl overflow-hidden shadow-xl border border-gray-300">
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6 text-gray-800 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">📅 Date:</span>{" "}
            {new Date(event.date).toLocaleString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">📍 Location:</span>{" "}
            {event.location}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">🔒 Type:</span>{" "}
            {event.isPrivate ? "Private" : "Public"}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">💰 Price:</span>{" "}
            {event.isPaid ? `৳${event.price}` : "Free"}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">🎯 Category:</span>{" "}
            {event.category}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">📩 Author:</span>{" "}
            {event.Author}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">
              🌐 Visibility:
            </span>{" "}
            {event.visibility}
          </p>

          {renderButton()}
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
