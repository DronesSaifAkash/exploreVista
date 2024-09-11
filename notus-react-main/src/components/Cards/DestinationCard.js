import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
        <img
          src={`/images/destinations/${destination.image}`} // Image source
          alt={destination.name}
          className="w-40 h-350-px object-cover "
        />
        <div className="px-4 py-5 flex-auto">
          <h6 className="text-xl font-semibold">{destination.name}</h6>
          <p className="mt-2 mb-4 text-blueGray-500 h-10">
            {destination.description} 
            <Link
              to={`destinations/${destination._id}`}
              className="text-lightBlue-500 hover:underline text-sm mx-2 p-2"
            >
              Load More
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
