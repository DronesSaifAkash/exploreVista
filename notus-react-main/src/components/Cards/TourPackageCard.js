// components/Cards/TourPackageCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const TourPackageCard = ({ _id, name, description, price, duration, available }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to toggle between full and truncated description
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Function to truncate description
    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.substring(0, limit) + "...";
    };

    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="flex justify-between items-center  bg-gray-800 rounded-t-lg" >
                        <h6 className="text-xl font-semibold">{name}</h6>
                        <p className={`my-2 rounded bg-blueGray-200 text-sm shadow-md p-2 ${available ? 'text-green-500' : 'text-red-500'}`}>
                            {available ? 'Available' : 'Not Available'}
                        </p>
                    </div>
                    <p className="mt-2 mb-4 text-blueGray-500">
                        {showFullDescription ? description : truncateText(description, 100)}
                    </p>
                    {description.length > 100 && (
                        <button
                            className="text-lightBlue-500 text-sm"
                            onClick={toggleDescription}
                        >
                            {showFullDescription ? "Show less" : "Read more"}
                        </button>
                    )}

                    <p className="text-blueGray-700 font-bold mt-4">Price: ₹ {price}</p>
                    <p className="text-blueGray-700 mb-4 ">Duration: {duration}</p>
                    <Link to={`/tour-packages/${_id}`} className="text-blueGray-600 px-6 font-semibold text-base bg-lightBlue-300  border rounded p-2 shadow-sm hover:shadow-md">
                        <small>Book Now </small>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourPackageCard;
