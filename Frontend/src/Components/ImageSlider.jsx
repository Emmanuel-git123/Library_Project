import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../assets/library.jpg";
import img2 from "../assets/library_2.jpg";
import img3 from "../assets/library_3.jpg";
import img4 from "../assets/library_4.jpg";
import img5 from "../assets/library_5.jpg";

const images = [img1, img2, img3, img4, img5];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };
    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="slider"
                        className="w-full h-[700px] object-cover flex-shrink-0"
                    />
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black">
                <ChevronLeft size={28} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black">
                <ChevronRight size={28} />
            </button>
        </div>
    );
};

export default ImageSlider;