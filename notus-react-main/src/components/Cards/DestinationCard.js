import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
        <img
          src={`/images/destinations/${destination.image}`} // Image source
          alt={destination.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="px-4 py-5 flex-auto">
          <h6 className="text-xl font-semibold">{destination.name}</h6>
          <p className="mt-2 mb-4 text-blueGray-500">
            {destination.description}
          </p>
          <Link
            to={destination.detailsPageLink}
            className="text-lightBlue-500 hover:underline"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
