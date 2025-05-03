"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GetUserEmail from "@/hooks/GetUserEmail";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  isPaid: boolean;
  price: number;
  image: string;
  category: string;
  visibility: string;
  isPrivate: boolean;
  Author: string;
  isFeatureSelected: boolean;
  creator_id: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  full_name: string;
  phone: string;
  address: string;
  createdAt: string;
}

const DashboardHome: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const userEmail = GetUserEmail();

  useEffect(() => {
    if (userEmail) {
      fetch(
        `https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`
      )
        .then((res) => res.json())
        .then((resp) => setUser(resp?.data))
        .catch(() => {});
    }
  }, [userEmail]);

  useEffect(() => {
    axios
      .get("https://event-craft-serv.vercel.app/api/v1/event/events")
      .then((res) => {
        if (res.data.success) {
          const allEvents: EventData[] = res.data.data;
          const filtered =
            user?.role === "ADMIN"
              ? allEvents
              : allEvents.filter(
                  (event: EventData) => event.Author === userEmail
                );
          setEvents(filtered);
        }
      })
      .catch(() => {});
  }, [userEmail, user]);

  const handleDeleteEvent = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://event-craft-serv.vercel.app/api/v1/event/events/${id}`
        );
        if (res.data.success) {
          setEvents(events.filter((e) => e.id !== id));
          Swal.fire("Deleted!", "Event deleted.", "success");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "There was an issue deleting the event.", "error");
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <motion.div
        className="mb-6 bg-white p-6 rounded-lg shadow-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-blue-600">
          👤 User Information
        </h2>
        <div className="mt-4 space-y-2">
          <p>
            <strong className="text-lg text-blue-500">Full Name:</strong>{" "}
            {user?.full_name || "N/A"}
          </p>
          <p>
            <strong className="text-lg text-blue-500">Email:</strong>{" "}
            {user?.email}
          </p>
          <p>
            <strong className="text-lg text-blue-500">Phone:</strong>{" "}
            {user?.phone || "N/A"}
          </p>
          <p>
            <strong className="text-lg text-blue-500">Address:</strong>{" "}
            {user?.address || "N/A"}
          </p>
        </div>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold mb-4 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📋 My Events Quick Action
      </motion.h2>

      <div className="hidden md:block overflow-x-auto">
        <motion.table
          className="min-w-full bg-white border border-gray-200 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-teal-400 to-blue-500 text-left text-white">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Featured</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <motion.tr
                key={event.id}
                className="hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-3 border">{event.title}</td>
                <td className="p-3 border">
                  {new Date(event.date).toLocaleString()}
                </td>
                <td className="p-3 border">{event.location}</td>
                <td className="p-3 border">{event.category}</td>
                <td className="p-3 border">{event.isPaid ? "Paid" : "Free"}</td>
                <td className="p-3 border">
                  {event.isPaid ? `৳${event.price}` : "-"}
                </td>
                <td className="p-3 border">
                  {event.isFeatureSelected ? "Yes" : "No"}
                </td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default DashboardHome;
