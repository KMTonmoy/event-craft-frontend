'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillAlt, FaLock, FaUser, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import GetUserEmail from '@/hooks/GetUserEmail';

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
  creator_id: string;
}

const MyEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState<EventData | null>(null);
  const [newEvent, setNewEvent] = useState<EventData>({
    id: '',
    title: '',
    date: '',
    location: '',
    isPaid: false,
    price: 0,
    image: '',
    category: 'Technology',
    visibility: 'PUBLIC',
    isPrivate: false,
    Author: '',
    isFeatureSelected: false,
    creator_id: '',
  });

  const userEmail = GetUserEmail();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userEmail) {
      fetch(`https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`)
        .then((res) => res.json())
        .then((resp) => setData(resp))
        .catch(() => {});
    }
  }, [userEmail]);

  const user = data?.data;

  useEffect(() => {
    axios
      .get('https://event-craft-serv.vercel.app/api/v1/event/events')
      .then((response) => {
        if (response.data.success) {
          setEvents(response.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateEvent = async () => {
    const payload = { ...newEvent, Author: user?.email, creator_id: user?.id };
    try {
      const response = await axios.post('https://event-craft-serv.vercel.app/api/v1/event/events', payload);
      if (response.data.success) {
        setEvents([...events, response.data.data]);
        Swal.fire('Event Created!', 'Your event has been created.', 'success');
        setIsModalOpen(false);
        setNewEvent({
          id: '',
          title: '',
          date: '',
          location: '',
          isPaid: false,
          price: 0,
          image: '',
          category: 'Technology',
          visibility: 'PUBLIC',
          isPrivate: false,
          Author: '',
          isFeatureSelected: false,
          creator_id: '',
        });
      }
    } catch {}
  };

  const handleUpdateEvent = async () => {
    if (!editEvent) return;
    try {
      const response = await axios.put(`https://event-craft-serv.vercel.app/api/v1/event/events/${editEvent.id}`, editEvent);
      if (response.data.success) {
        setEvents(events.map(event => event.id === editEvent.id ? response.data.data : event));
        Swal.fire('Event Updated!', 'Your event has been updated.', 'success');
        setIsModalOpen(false);
        setIsEditing(false);
        setEditEvent(null);
      }
    } catch {}
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await axios.delete(`https://event-craft-serv.vercel.app/api/v1/event/events/${id}`);
      if (response.data.success) {
        setEvents(events.filter(event => event.id !== id));
        Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
      }
    } catch {}
  };

  const openEditModal = (event: EventData) => {
    setEditEvent(event);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">🎉 My Events</h2>
      <div className="flex justify-center mb-6">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Create New Event</button>
      </div>
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
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => openEditModal(event)} className="text-yellow-500"><FaEdit /></button>
                <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500"><FaTrash /></button>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-4xl space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">{isEditing ? 'Edit Event' : 'Add Event'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['title', 'date', 'location', 'price', 'image'].map(field => (
                <div className="space-y-2" key={field}>
                  <label className="block text-gray-700 font-semibold capitalize">{field}</label>
                  <input
                    name={field}
                    type={field === 'price' ? 'number' : field === 'date' ? 'datetime-local' : 'text'}
                    value={isEditing ? editEvent?.[field as keyof EventData] || '' : newEvent[field as keyof EventData] as string}
                    onChange={(e) => {
                      const value = field === 'price' ? Number(e.target.value) : e.target.value;
                      isEditing
                        ? setEditEvent({ ...editEvent!, [field]: value })
                        : setNewEvent({ ...newEvent, [field]: value });
                    }}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Category</label>
                <select
                  name="category"
                  value={isEditing ? editEvent?.category : newEvent.category}
                  onChange={(e) => {
                    isEditing ? setEditEvent({ ...editEvent!, category: e.target.value }) : setNewEvent({ ...newEvent, category: e.target.value });
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">Visibility</label>
                <select
                  name="visibility"
                  value={isEditing ? editEvent?.visibility : newEvent.visibility}
                  onChange={(e) => {
                    isEditing ? setEditEvent({ ...editEvent!, visibility: e.target.value }) : setNewEvent({ ...newEvent, visibility: e.target.value });
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>
              <div className="space-y-2 flex items-center gap-2">
                <label className="text-gray-700 font-semibold">Private</label>
                <input
                  type="checkbox"
                  checked={isEditing ? editEvent?.isPrivate : newEvent.isPrivate}
                  onChange={(e) => {
                    isEditing ? setEditEvent({ ...editEvent!, isPrivate: e.target.checked }) : setNewEvent({ ...newEvent, isPrivate: e.target.checked });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button
                onClick={isEditing ? handleUpdateEvent : handleCreateEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
