import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const DistrictCard = ({ name, thumbnail, description }) => {
    return (
        <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <Link
                    to={`/districts/${name}`}
                    className="text-lightBlue-500 hover:underline"
                >
                    <img
                        src={`/images/districts/${thumbnail}`} // Image source
                        alt={name}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="px-4 py-5 flex-auto">
                        <h6 className="text-xl font-semibold">{name}</h6>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DistrictCard;