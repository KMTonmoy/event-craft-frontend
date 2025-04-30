'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8"
      >
        About EventCraft
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
      >
        EventCraft is your go-to platform for discovering, planning, and participating in exciting events around you.
        Whether it’s a public concert, a private workshop, or a paid seminar — we bring the experience to your fingertips.
      </motion.p>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white shadow-lg rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-blue-500 mb-2">🎉 Discover Events</h3>
          <p className="text-gray-600">
            Find events by category, date, or popularity. From free public events to exclusive private ones — theres something for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white shadow-lg rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-blue-500 mb-2">📅 Easy Planning</h3>
          <p className="text-gray-600">
            Create and manage your own events easily. Set dates, prices, and privacy settings with just a few clicks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-white shadow-lg rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-blue-500 mb-2">🚀 Seamless Participation</h3>
          <p className="text-gray-600">
            Register and join events in seconds. Stay updated and connected with organizers and other participants.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800"
        >
          Built with ❤️ by Tonmoy Ahamed
        </motion.h2>
        <p className="text-gray-600 mt-2">EventCraft — Experience every moment, effortlessly.</p>
      </div>
    </div>
  );
};

export default AboutPage;
