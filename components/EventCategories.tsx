import React from 'react';
import {
  FaMusic,
  FaFilm,
  FaFootballBall,
  FaTheaterMasks,
  FaHeart,
  FaLaptopCode,
} from "react-icons/fa";

const EventCategories = () => {
  const categories = [
    {
      id: 1,
      icon: <FaMusic size={50} className="text-blue-600" />,
      title: 'Music',
      description: 'Discover music events, concerts, and festivals happening around you.',
    },
    {
      id: 2,
      icon: <FaFilm size={50} className="text-red-600" />,
      title: 'Movies',
      description: 'Find movie screenings, film festivals, and more exciting film-related events.',
    },
    {
      id: 3,
      icon: <FaFootballBall size={50} className="text-green-600" />,
      title: 'Sports',
      description: 'Join local sports events, tournaments, and games in your area.',
    },
    {
      id: 4,
      icon: <FaTheaterMasks size={50} className="text-yellow-600" />,
      title: 'Theater',
      description: 'Explore theater performances, plays, and drama events near you.',
    },
    {
      id: 5,
      icon: <FaHeart size={50} className="text-pink-600" />,
      title: 'Charity',
      description: 'Find charity events and fundraising activities happening around you.',
    },
    {
      id: 6,
      icon: <FaLaptopCode size={50} className="text-teal-600" />,
      title: 'Programming',
      description: 'Explore coding workshops, hackathons, and tech meetups for developers.',
    },
 
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Event Categories</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
