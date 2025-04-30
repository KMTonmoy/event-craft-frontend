import React from 'react';
import { FaSearch, FaRocket, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const PlatformFeatures = () => {
  const features = [
    {
      id: 1,
      icon: <FaSearch size={40} className="text-blue-500" />,
      title: 'Easy Search',
      description:
        'Quickly search for events, businesses, or services. Our search engine provides you with instant, relevant results.',
    },
    {
      id: 2,
      icon: <FaRocket size={40} className="text-green-500" />,
      title: 'Fast Performance',
      description:
        'Experience lightning-fast load times and responsive interactions, making your experience smooth and efficient.',
    },
    {
      id: 3,
      icon: <FaShieldAlt size={40} className="text-yellow-500" />,
      title: 'Secure & Safe',
      description:
        'Your data is safe with us. We prioritize security, ensuring that your personal information is protected.',
    },
    {
      id: 4,
      icon: <FaMobileAlt size={40} className="text-red-500" />,
      title: 'Mobile Friendly',
      description:
        'Our platform is fully responsive, ensuring a seamless experience on both desktop and mobile devices.',
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Platform Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;
