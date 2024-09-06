import React from 'react';

const AdminDestinationCard = ({ destination }) => {
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <img
                alt={destination.name}
                src={`http://localhost:5000/images/${destination.image}`}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="px-6 py-4">
                <h5 className="text-xl font-semibold">{destination.name}</h5>
                <p className="text-gray-600 mt-2">{destination.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-blueGray-500 text-sm">{destination.location}</span>
                    <button className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDestinationCard;
