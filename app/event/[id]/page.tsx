"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GetUserEmail from "@/hooks/GetUserEmail";
import Swal from "sweetalert2";

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

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userEmail = GetUserEmail();

  useEffect(() => {
    if (userEmail) {
      fetch(`https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`)
        .then((res) => res.json())
        .then((resp) => setUser(resp?.data as User))
        .catch(() => {});
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`https://event-craft-serv.vercel.app/api/v1/event/events/${id}`);
      const data = await res.json();
      setEvent(data.data as Event);
    };

    if (id) fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-20">Loading...</p>;

  const handleJoin = async () => {
    if (!user) {
      Swal.fire({
        title: "Error",
        text: "You need to log in to join the event!",
        icon: "error",
      });
      return;
    }

    const isInstantJoin = !event.isPaid && !event.isPrivate;

    const participationData = {
      userId: user.id,
      eventId: event.id,
      status: isInstantJoin ? "ACCEPTED" : "PENDING",
    };

    const res = await fetch(
      "https://event-craft-serv.vercel.app/api/v1/participant/participations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participationData),
      }
    );

    if (res.ok) {
      Swal.fire({
        title: isInstantJoin ? "Success" : "Request Sent",
        text: isInstantJoin
          ? "You have successfully joined the event!"
          : "You have requested to join the event. Please wait for approval.",
        icon: isInstantJoin ? "success" : "info",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "There was an error joining the event.",
        icon: "error",
      });
    }
  };

  const renderButton = () => {
    if (event.isPrivate || event.isPaid) {
      return (
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          onClick={handleJoin}
        >
          Request to Join
        </button>
      );
    }

    return (
      <button
        className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition duration-300"
        onClick={handleJoin}
      >
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
