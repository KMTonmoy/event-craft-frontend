"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EventCard from "@/components/Card";

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

const FilteredEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    axios
      .get("https://event-craft-serv.vercel.app/api/v1/event/events")
      .then((res) => setEvents(res.data?.data || []))
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, []);

  const filtered = events
    .filter((e) => {
      const searchMatch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase());

      const filterMatch =
        filter === "All"
          ? true
          : filter === "Public Free"
          ? !e.isPrivate && !e.isPaid
          : filter === "Public Paid"
          ? !e.isPrivate && e.isPaid
          : filter === "Private Free"
          ? e.isPrivate && !e.isPaid
          : e.isPrivate && e.isPaid;

      return searchMatch && filterMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold text-center">🎯 Browse Events</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or category"
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="All">All</option>
            <option value="Public Free">Public Free</option>
            <option value="Public Paid">Public Paid</option>
            <option value="Private Free">Private Free</option>
            <option value="Private Paid">Private Paid</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Grid of Events */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event, index) => (
          <motion.div
            key={event.id}
            className="transition-all hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EventCard {...event} />
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No matching events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FilteredEvents;
