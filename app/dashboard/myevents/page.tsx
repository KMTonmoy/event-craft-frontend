'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
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

interface User {
  id: string;
  email: string;
  role: string;
}

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState<EventData | null>(null);

  const defaultEvent: EventData = {
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
  };

  const [newEvent, setNewEvent] = useState<EventData>(defaultEvent);
  const userEmail = GetUserEmail();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userEmail) {
      fetch(`https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`)
        .then(res => res.json())
        .then(resp => setUser(resp?.data))
        .catch(() => {});
    }
  }, [userEmail]);

  useEffect(() => {
    axios.get('https://event-craft-serv.vercel.app/api/v1/event/events')
      .then(res => {
        if (res.data.success) {
          const allEvents: EventData[] = res.data.data;
          const filtered = user?.role === 'ADMIN'
            ? allEvents
            : allEvents.filter((event: EventData) => event.Author === userEmail);
          setEvents(filtered);
        }
      })
      .catch(() => {});
  }, [userEmail, user]);

  const handleCreateEvent = async () => {
    const payload = { ...newEvent, Author: user?.email || '', creator_id: user?.id || '' };
    try {
      const res = await axios.post('https://event-craft-serv.vercel.app/api/v1/event/events', payload);
      if (res.data.success) {
        setEvents([...events, res.data.data]);
        Swal.fire('Created!', 'Event created successfully.', 'success');
        setNewEvent(defaultEvent);
        setIsModalOpen(false);
      }
    } catch {}
  };

  const handleUpdateEvent = async () => {
    if (!editEvent) return;
    try {
      const res = await axios.put(`https://event-craft-serv.vercel.app/api/v1/event/events/${editEvent.id}`, editEvent);
      if (res.data.success) {
        setEvents(events.map(e => e.id === editEvent.id ? res.data.data : e));
        Swal.fire('Updated!', 'Event updated successfully.', 'success');
        setIsModalOpen(false);
        setEditEvent(null);
        setIsEditing(false);
      }
    } catch {}
  }; 

  const handleDeleteEvent = async (id: string) => {
    try {
      const res = await axios.delete(`https://event-craft-serv.vercel.app/api/v1/event/events/${id}`);
      if (res.data.success) {
        setEvents(events.filter(e => e.id !== id));
        Swal.fire('Deleted!', 'Event deleted.', 'success');
      }
    } catch {}
  };

  const openEditModal = (event: EventData) => {
    const formattedDate = new Date(event.date).toISOString().slice(0, 16);
    setEditEvent({ ...event, date: formattedDate });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">🎉 My Events</h2>
      <div className="text-center mb-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Create New</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map(event => (
          <motion.div key={event.id} className="border p-4 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p><FaCalendarAlt className="inline" /> {new Date(event.date).toLocaleString()}</p>
              <p><FaMapMarkerAlt className="inline" /> {event.location}</p>
              <p><FaMoneyBillAlt className="inline" /> {event.isPaid ? `৳${event.price}` : 'Free'}</p>
              <p><FaUser className="inline" /> {event.Author}</p>
            </div>
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => openEditModal(event)} className="text-yellow-600"><FaEdit /></button>
              <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600"><FaTrash /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl">
            <h3 className="text-lg font-bold mb-4 text-blue-600">{isEditing ? 'Edit Event' : 'Add New Event'}</h3>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Title"
                value={isEditing ? editEvent?.title : newEvent.title}
                onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, title: e.target.value }) : setNewEvent({ ...newEvent, title: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="datetime-local"
                value={isEditing ? editEvent?.date : newEvent.date}
                onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, date: e.target.value }) : setNewEvent({ ...newEvent, date: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Location"
                value={isEditing ? editEvent?.location : newEvent.location}
                onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, location: e.target.value }) : setNewEvent({ ...newEvent, location: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={isEditing ? editEvent?.image : newEvent.image}
                onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, image: e.target.value }) : setNewEvent({ ...newEvent, image: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <div className="flex items-center gap-2">
                <label>Paid:</label>
                <select
                  value={isEditing ? (editEvent?.isPaid ? 'Yes' : 'No') : (newEvent.isPaid ? 'Yes' : 'No')}
                  onChange={(e) => {
                    const isPaid = e.target.value === 'Yes';
                    if (isEditing) {
                      setEditEvent({ ...editEvent!, isPaid, price: isPaid ? editEvent!.price : 0 });
                    } else {
                      setNewEvent({ ...newEvent, isPaid, price: isPaid ? newEvent.price : 0 });
                    }
                  }}
                  className="border p-2 rounded"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              {(isEditing ? editEvent?.isPaid : newEvent.isPaid) && (
                <input
                  type="number"
                  placeholder="Price"
                  value={isEditing ? editEvent?.price : newEvent.price}
                  onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, price: Number(e.target.value) }) : setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                  className="border p-2 rounded w-full"
                />
              )}
              <select
                value={isEditing ? editEvent?.category : newEvent.category}
                onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, category: e.target.value }) : setNewEvent({ ...newEvent, category: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
              </select>
              <div className="flex items-center gap-2">
                <label>Private:</label>
                <input
                  type="checkbox"
                  checked={isEditing ? editEvent?.isPrivate : newEvent.isPrivate}
                  onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, isPrivate: e.target.checked }) : setNewEvent({ ...newEvent, isPrivate: e.target.checked })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label>Featured:</label>
                <input
                  type="checkbox"
                  checked={isEditing ? editEvent?.isFeatureSelected : newEvent.isFeatureSelected}
                  onChange={(e) => isEditing ? setEditEvent({ ...editEvent!, isFeatureSelected: e.target.checked }) : setNewEvent({ ...newEvent, isFeatureSelected: e.target.checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setIsModalOpen(false); setIsEditing(false); setEditEvent(null); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={isEditing ? handleUpdateEvent : handleCreateEvent} className="bg-blue-600 text-white px-4 py-2 rounded">
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
