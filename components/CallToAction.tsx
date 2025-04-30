import React, { useState } from 'react';

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted!');
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto gap-5  px-4 flex flex-col md:flex-row items-center">
        {/* Form Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Action Form
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Get in touch with us. We would love to hear from you!
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-lg shadow-lg text-gray-800"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1661763911173-f2f7becc70b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Us"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
