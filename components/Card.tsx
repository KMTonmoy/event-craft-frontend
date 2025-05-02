import Link from 'next/link';
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaLock, FaTag, FaUsers } from 'react-icons/fa';

interface EventProps {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  isPaid: boolean;
  isPrivate: boolean;
  price: number;
}

const formatStartDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const EventCard: React.FC<EventProps> = ({
  title,
  category,
  date,
  location,
  image,
  isPaid,
  isPrivate,
  price,
  id
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-blue-600 text-sm font-medium mb-3">{category}</p>
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <FaClock className="text-blue-500" />
          <span>Starts: {formatStartDateTime(date)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <FaMapMarkerAlt className="text-blue-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaTag className="text-blue-500" />
          <span>{isPaid ? `৳${price}` : "Free"}</span>
          {isPaid && (
            <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Paid
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Link href={`/event/${id}`}>
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              View Details
            </button>
          </Link>
        </div>
        <p className="text-xs mt-2 flex items-center gap-1">
          {isPrivate ? (
            <>
              <FaLock className="text-red-500" /> Private Event - Approval Required
            </>
          ) : (
            <>
              <FaUsers className="text-green-500" /> Public Event
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
