import React, { useEffect, useState } from 'react';
import AdminDestinationTable from 'components/Tables/AdminDestinationTable'; // Adjust the import path as necessary

const AdminDestinations = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const token = localStorage.getItem('token'); // or however you store your token
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
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                    <AdminDestinationTable destinations={destinations} />
                </div>
                {/* <div className="w-full xl:w-4/12 px-4"><AddDistrict /></div> */}
            </div>
        </>
    );
};

export default AdminDestinations;
