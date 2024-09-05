// src/components/PopularPlaces.js
import React from 'react';

const popularPlaces = [
  {
    name: "Eiffel Tower",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/2e/16/f8.jpg",
    description: "Symbol of Paris and France. Designed by Gustave Eiffel.",
    link: "#"
  },
  {
    name: "Great Wall of China",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Mutianyu_Great_Wall_2014.jpg",
    description: "Ancient wall that stretches across northern China.",
    link: "#"
  },
  // Add more places as needed
];

const PopularPlaces = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Places</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {popularPlaces.map((place, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="text-gray-600 mt-2">{place.description}</p>
              <a href={place.link} className="text-blue-500 mt-4 block hover:underline">Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
