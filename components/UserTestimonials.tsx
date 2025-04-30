'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const UserTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      feedback:
        'This platform has transformed my event planning experience! So easy to find and book great events!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      feedback:
        'Absolutely love the variety of events available. The process is so smooth and seamless.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Robert Brown',
      feedback:
        'A great experience from start to finish. The platform is user-friendly and offers amazing options!',
      rating: 5,
    },
    {
      id: 4,
      name: 'Emily Davis',
      feedback:
        'Highly recommend! The event selection is fantastic, and the booking process is hassle-free.',
      rating: 4,
    },
    {
      id: 5,
      name: 'Michael Lee',
      feedback:
        'Best event planning platform ever! I’ve booked so many events here and each one has been fantastic.',
      rating: 5,
    },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Our Users Say</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-gray-700 italic mb-4">{testimonial.feedback}</p>
                <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15l-5.293 3.146a1 1 0 01-1.447-1.32L5.618 12.68 1.171 8.93a1 1 0 01.553-1.716L6.544 6l1.737-5.48A1 1 0 019 0h2a1 1 0 011.073.52l1.736 5.48 5.818.663a1 1 0 01.553 1.716l-4.447 3.75 1.88 5.067a1 1 0 01-1.448 1.32L10 15z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UserTestimonials;
