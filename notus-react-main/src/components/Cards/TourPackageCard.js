import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const TourPackageCard = ({ _id, name, description, price, duration, available }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const history = useHistory();
    
    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.substring(0, limit) + "...";
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleBookNow = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to book a tour.");
            history.push('/auth/login');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get('/api/users/profile', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'User-Id': userId  // Send userId in request headers or params as needed
                }
            });
    
            if (response.data.type === 'admin') {
                alert("Admins cannot book tours.");
                return;
            }
            if (response.data.type === 'user') {   
                // Proceed with booking logic if the user is a regular user
                history.push(`/tour-packages/${_id}`);
            }
        } catch (error) {
            console.error('Error checking user profile:', error);
            alert("Invalid User. Try Again Later..");
        }
    };

    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="flex justify-between items-center bg-gray-800 rounded-t-lg">
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
                    <p className="text-blueGray-700 mb-4">Duration: {duration}</p>

                    <button
                        className="text-blueGray-600 px-6 font-semibold text-base bg-lightBlue-300 border rounded p-2 shadow-sm hover:shadow-md"
                        onClick={handleBookNow}
                    >
                        <small>Book Now</small>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourPackageCard;
