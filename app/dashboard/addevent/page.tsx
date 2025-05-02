'use client'
import React, { useState } from 'react';
import axios from 'axios';

const EventPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [price, setPrice] = useState(0);
  const [Author, setAuthor] = useState('');
  const [isFeatureSelected, setIsFeatureSelected] = useState(false);
  const [creator_id, setCreatorId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      category,
      image,
      date,
      location,
      isPaid,
      price: isPaid ? price : 0,
      Author,
      isFeatureSelected,
      creator_id
    };

    try {
      await axios.post('http://localhost:5000/api/v1/event/events', formData);
      alert('Event Created Successfully');
      setTitle('');
      setCategory('');
      setImage('');
      setDate('');
      setLocation('');
      setIsPaid(false);
      setIsPrivate(false);
      setPrice(0);
      setAuthor('');
      setIsFeatureSelected(false);
      setCreatorId('');
      setIsModalOpen(false);  
    } catch (error) {
      console.log(error)
      alert('Failed to create event');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        className="bg-blue-600 text-white py-2 px-6 rounded-md mb-4 hover:bg-blue-700 transition duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Create Event
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  type="text" 
                  placeholder="Category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  type="text" 
                  placeholder="Image URL" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  type="datetime-local" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  className="border p-2 rounded" 
                />

                {/* Yes/No for isPaid */}
                <div className="flex items-center gap-2 col-span-2">
                  <label>Is Paid?</label>
                  <button 
                    type="button" 
                    className={`py-2 px-4 rounded ${isPaid ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`} 
                    onClick={() => setIsPaid(true)}
                  >
                    Yes
                  </button>
                  <button 
                    type="button" 
                    className={`py-2 px-4 rounded ${!isPaid ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`} 
                    onClick={() => setIsPaid(false)}
                  >
                    No
                  </button>
                </div>

                {/* Conditional price input */}
                {isPaid && (
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    className="border p-2 rounded" 
                  />
                )}

                <input 
                  type="text" 
                  placeholder="Author" 
                  value={Author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  type="text" 
                  placeholder="Creator ID" 
                  value={creator_id} 
                  onChange={(e) => setCreatorId(e.target.value)} 
                  className="border p-2 rounded" 
                />

                <label className="flex items-center gap-2 col-span-1">
                  <input 
                    type="checkbox" 
                    checked={isPrivate} 
                    onChange={(e) => setIsPrivate(e.target.checked)} 
                  />
                  isPrivate
                </label>

                <label className="flex items-center gap-2 col-span-1">
                  <input 
                    type="checkbox" 
                    checked={isFeatureSelected} 
                    onChange={(e) => setIsFeatureSelected(e.target.checked)} 
                  />
                  isFeatureSelected
                </label>

              </div>

              <div className="flex justify-between mt-4">
                <button 
                  type="button" 
                  className="bg-gray-400 text-white py-2 px-6 rounded-md" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white py-2 px-6 rounded-md"
                >
                  Submit Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPostForm;
