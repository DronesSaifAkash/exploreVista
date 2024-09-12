import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Array(rating).fill("★");
    const emptyStars = Array(totalStars - rating).fill("☆");
    return [...filledStars, ...emptyStars];
  };

  return (
    <div className=" w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-8 shadow-xl rounded-lg hover:shadow-md">
        <Link
          to={`destinations/${destination._id}`}
          className="text-lightBlue-500 hover:underline text-sm mx-2 p-2 "
        >
          <img
            src={`/images/destinations/${destination.image}`} // Image source
            alt={destination.name}
            className="w-40 h-350-px object-cover "
          />
          <div className="px-4 py-5 flex-auto">
            <div className="flex justify-between">
              <h6> <span className="font-semibold text-xl"> {destination.name} </span> - <span className="font-base"> {destination.location} </span></h6>
              <div className="flex justify-center items-center text-yellow-500 ">
                {renderStars(destination.rating).map((star, index) => (
                  <span key={index} className="text-lg text-orange-500">
                    {star}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
