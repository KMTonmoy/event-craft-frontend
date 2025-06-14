"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EventCard from "./Card";

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
  isFeatureSelected: boolean;
}

const FeaturedEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    axios
      .get("https://event-craft-serv.vercel.app/api/v1/event/events")
      .then((res) => {
        const allEvents = res.data.data as EventType[];

        if (jwt) {
          const upcomingEvents = allEvents.filter(
            (event) => isUpcoming(event.date) && event.isFeatureSelected
          );
          const randomEvents = shuffle(upcomingEvents).slice(0, 6);
          setEvents(randomEvents);
        } else {
          const publicEvents = allEvents.filter(
            (event) =>
              !event.isPrivate &&
              isUpcoming(event.date) &&
              event.isFeatureSelected
          );
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
      <h2 className="text-3xl font-bold text-center mb-8">
        🌟 Featured Events
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="transition-all hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EventCard
              title={event.title}
              category={event.category}
              date={event.date}
              location={event.location}
              image={event.image}
              isPaid={event.isPaid}
              isPrivate={event.isPrivate}
              price={event.price}
              id={event.id}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
