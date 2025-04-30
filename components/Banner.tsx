'use client'
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
    const slides = [
        {
            img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "Welcome to EventCraft",
            subtitle: "Your Gateway to Memorable Events",
        },
        {
            img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "Crafting Moments That Matter",
            subtitle: "Find, Plan & Join Amazing Events",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-[60vh] sm:h-[85vh] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    style={{ backgroundImage: `url(${slide.img})` }}
                >
                    <div className="w-full h-full bg-black/50 flex items-center justify-center sm:justify-start px-6 sm:px-20">
                        <div className="text-center sm:text-left text-white max-w-xl">
                            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{slide.title}</h1>
                            <p className="text-lg sm:text-xl mb-6">{slide.subtitle}</p>
                            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition">
                                Explore Events
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full z-20"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full z-20"
            >
                <FaChevronRight size={20} />
            </button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'} transition`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
