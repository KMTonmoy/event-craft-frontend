import React from 'react';

const TrustedBy = () => {
  const logos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1678483789111-3a04c4628bd6?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Google",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0-3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Instagram",
    },
    {
      id: 3,
      src: "https://store-images.s-microsoft.com/image/apps.23871.13668225141277943.68205d94-7cbe-41f0-893f-53305fceb682.4c98395a-28d0-4eee-9b6e-08ecd210e980",
      alt: "Dropbox",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1705988142466-e468bc654eeb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0-3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slack",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0-3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Twitter",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Trusted By Leading Brands
        </h2>

        <div className="flex justify-center space-x-8 overflow-x-auto">
          {logos.map((logo) => (
            <div key={logo.id} className="flex-shrink-0 w-24 h-24">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-cover rounded-full transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
