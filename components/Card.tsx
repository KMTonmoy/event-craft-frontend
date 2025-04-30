import React from 'react';
import { FaClock, FaMapMarkerAlt, FaLock, FaTag, FaUsers } from 'react-icons/fa';

interface EventProps {
  title: string;
  category: string;
  date: string;
  endTime: string;
  location: string;
  image: string;
  isPaid: boolean;
  isPrivate: boolean;
  price: number;
  onButtonClick: () => void;
  buttonText: string;
}

const formatStartDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const formatEndTime = (timeStr: string) => {
  if (!timeStr) return 'TBD';
  const time = new Date(timeStr);
  if (isNaN(time.getTime())) return 'TBD';  
  return time.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
};

const EventCard: React.FC<EventProps> = ({ 
  title, 
  category, 
  date, 
  endTime, 
  location, 
  image, 
  isPaid, 
  isPrivate, 
  price, 
  onButtonClick, 
  buttonText 
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-blue-600 text-sm font-medium mb-3">{category}</p>

        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <FaClock className="text-blue-500" />
          <span>Starts: {formatStartDateTime(date)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <FaClock className="text-blue-500" />
          <span>Ends around: {formatEndTime(endTime)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <FaMapMarkerAlt className="text-blue-500" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaTag className="text-blue-500" />
          <span>{isPaid ? `৳${price}` : 'Free'}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onButtonClick}
            className={`px-4 py-2 text-sm font-medium rounded-md w-full transition-colors ${
              buttonText === 'Event Ended'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {buttonText}
          </button>
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
