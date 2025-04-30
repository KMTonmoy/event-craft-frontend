import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transition-all hover:scale-105"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="mb-6 flex justify-center items-center">
              <div className="bg-blue-600 p-5 rounded-full shadow-lg">
                <FaSearch className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="text-2xl font-medium text-center mb-4">Search</h3>
            <p className="text-center text-gray-700">
              Start by searching for the best events, services, or businesses
              around you.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transition-all hover:scale-105"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="mb-6 flex justify-center items-center">
              <div className="bg-green-600 p-5 rounded-full shadow-lg">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="text-2xl font-medium text-center mb-4">Choose</h3>
            <p className="text-center text-gray-700">
              Browse through the options and select the one that fits your needs
              the best.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transition-all hover:scale-105"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="mb-6 flex justify-center items-center">
              <div className="bg-red-600 p-5 rounded-full shadow-lg">
                <FaCalendarCheck className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="text-2xl font-medium text-center mb-4">
              Book & Enjoy
            </h3>
            <p className="text-center text-gray-700">
              Finally, make your booking and enjoy the experience. It’s that
              simple!
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-xl font-semibold mb-4">Ready to Get Started?</h4>
          <button className="bg-purple-700 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-purple-800 transition-colors">
            Join Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
