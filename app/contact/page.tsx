'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-blue-600 mb-12"
      >
        Get in Touch with EventCraft 🎉
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Image & Contact Info */}
        <div className="flex flex-col gap-6">
          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Contact Illustration"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-xl p-6 shadow-md space-y-4"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-500">📞 Phone</h2>
              <p className="text-gray-700">+880 1731-158705</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-500">📧 Email</h2>
              <p className="text-gray-700">support@eventcraft.com</p>
            </div>
          </motion.div>

        
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
