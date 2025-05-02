"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
}

const EventsShowcase = () => {
  const [freeEvents, setFreeEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios
      .get("https://event-craft-serv.vercel.app/api/v1/event/events")
      .then((res) => {
        const allEvents = res.data.data as EventType[];

        const upcomingFreeEvents = allEvents.filter(
          (e) => !e.isPaid && !e.isPrivate && new Date(e.date) >= new Date()
        );

        setFreeEvents(upcomingFreeEvents.slice(0, 9));
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        🎉 Free Public Upcoming Events
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        grabCursor
      >
        {freeEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="relative">
              <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full z-10 shadow">
                Free
              </div>
              <div className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 my-10">
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
                  id={event.id}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventsShowcase;
