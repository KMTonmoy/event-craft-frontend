import React from 'react';
import CountUp from 'react-countup';

const StatsCounter = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-green-500 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold mb-12">Our Achievements</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Total Events */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl">
            <h3 className="text-3xl font-semibold mb-4 text-blue-600">
              <CountUp start={0} end={542} duration={2} separator="," />
            </h3>
            <p className="text-lg">Total Events</p>
          </div>

          {/* Total Users */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl">
            <h3 className="text-3xl font-semibold mb-4 text-purple-600">
              <CountUp start={0} end={15000} duration={2} separator="," />
            </h3>
            <p className="text-lg">Total Users</p>
          </div>

          {/* Total Partners */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl">
            <h3 className="text-3xl font-semibold mb-4 text-green-600">
              <CountUp start={0} end={320} duration={2} separator="," />
            </h3>
            <p className="text-lg">Total Partners</p>
          </div>

          {/* Total Feedback */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-600">
              <CountUp start={0} end={900} duration={2} separator="," />
            </h3>
            <p className="text-lg">Total Feedbacks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
