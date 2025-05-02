'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaLock,
  FaUser,
  FaTrash,
  FaEdit,
  FaStar,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  isPaid: boolean;
  price: number;
  image: string;
  category: string;
  visibility: string;
  isPrivate: boolean;
  Author: string;
  isFeatureSelected: boolean;
}

const MyEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://event-craft-serv.vercel.app/api/v1/event/events');
        if (response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
 
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This event will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        await axios.delete(`https://event-craft-serv.vercel.app/api/v1/event/events/${eventId}`);
        Swal.fire('Deleted!', 'The event has been deleted.', 'success');
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
      }
     
  };

  const openEditModal = (event: EventData) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingEvent) return;
    const { name, value, type, checked } = e.target;

     if (name === 'isPaid' && value === 'no') {
      setEditingEvent({
        ...editingEvent,
        [name]: value === "yes",
        price: 0,
      });
    } else {
      setEditingEvent({
        ...editingEvent,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleUpdate = async () => {
     
      if (!editingEvent) return;
      await axios.put(`https://event-craft-serv.vercel.app/api/v1/event/events/${editingEvent.id}`, editingEvent);
      Swal.fire('Updated!', 'The event has been updated.', 'success');
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? editingEvent : e)));
      setIsModalOpen(false);
     
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        🎉 My Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="absolute top-3 right-3 flex gap-2">
                <FaEdit onClick={() => openEditModal(event)} className="text-blue-500 cursor-pointer hover:text-blue-700" size={18} />
                <FaTrash onClick={() => handleDelete(event.id)} className="text-red-500 cursor-pointer hover:text-red-700" size={18} />
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> {event.location}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaMoneyBillAlt /> {event.isPaid ? `৳${event.price}` : 'Free'}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaUser /> {event.Author}</p>
              <p className="text-sm text-gray-600">🏷️ Category: {event.category}</p>
              <p className="text-sm text-gray-600">🔒 Visibility: {event.visibility}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaLock /> {event.isPrivate ? 'Private' : 'Public'}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2"><FaStar /> {event.isFeatureSelected ? 'Featured' : 'Not Featured'}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-4xl space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">Edit Event</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Event Title</label>
                <input name="title" value={editingEvent.title} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" placeholder="Title" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Event Date</label>
                <input name="date" type="date" value={editingEvent.date.split('T')[0]} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Location</label>
                <input name="location" value={editingEvent.location} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" placeholder="Location" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Image URL</label>
                <input name="image" value={editingEvent.image} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" placeholder="Image URL" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Is Paid?</label>
                <select name="isPaid" value={editingEvent.isPaid ? 'yes' : 'no'} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Price (if Paid)</label>
                <input name="price" type="number" value={editingEvent.price} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" placeholder="Price" disabled={!editingEvent.isPaid} />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Category</label>
                <select name="category" value={editingEvent.category} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="music">Music</option>
                  <option value="conference">Conference</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Visibility</label>
                <select name="visibility" value={editingEvent.visibility} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Is Private?</label>
                <select name="isPrivate" value={editingEvent.isPrivate ? 'yes' : 'no'} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Is Featured?</label>
                <select name="isFeatureSelected" value={editingEvent.isFeatureSelected ? 'yes' : 'no'} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
