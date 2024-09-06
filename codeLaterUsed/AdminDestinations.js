import React, { useEffect, useState } from 'react';
import AdminDestinationCard from 'components/Cards/AdminDestinationCard'; // Adjust the import path as necessary

const AdminDestinations = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch destinations data from API
        const fetchDestinations = async () => {
            try {
                const token = localStorage.getItem('token'); // or however you store your token
                console.log(token);
                const response = await fetch('http://localhost:5000/api/admin/destinations', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className="flex flex-wrap">
            {destinations.map((destination) => (
                <div key={destination._id} className="w-full md:w-6/12 lg:w-4/12 px-4 mb-6">
                    <AdminDestinationCard destination={destination} />
                </div>
            ))}
        </div>
    );
};

export default AdminDestinations;

