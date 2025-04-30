"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EventCard from './Card';
 
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

  const handleButtonClick = (eventId: string) => {
    console.log(`Button clicked for event with ID: ${eventId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🌟 Featured Events</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => {
          const buttonText = event.isPrivate
            ? event.isPaid
              ? 'Request & Pay'
              : 'Request to Join'
            : event.isPaid
            ? 'Buy Ticket'
            : 'Join Event';

          return (
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
                endTime={event.endTime}
                location={event.location}
                image={event.image}
                isPaid={event.isPaid}
                isPrivate={event.isPrivate}
                price={event.price}
                onButtonClick={() => handleButtonClick(event.id)}
                buttonText={buttonText}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedEvents;
