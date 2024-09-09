import React, { useEffect, useState } from 'react';
import AdminDestinationTable from 'components/Tables/AdminDestinationTable'; // Adjust the import path as necessary

const AdminDestinations = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            setError('')
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in.');
                    setLoading(false);
                    window.location.href = '/auth/login';
                    return;
                }
                const response = await fetch('http://localhost:5000/api/admin/destinations', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(response.status===500){
                    window.location.href = '/auth/login';
                }
                const data = await response.json();
                setDestinations(data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.err && err.response.data.err.name === 'TokenExpiredError') {
                    setError('Session has expired. Please log in again.');
                    localStorage.removeItem('token'); // Clear expired token
                    window.location.href = 'auth/login'; // Redirect to login page
                } else {
                    console.error('Error fetching destinations:', err);
                }
                setError('Error fetching contacts');
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                    <AdminDestinationTable destinations={destinations} />
                </div>
                {/* <div className="w-full xl:w-4/12 px-4"><AddDistrict /></div> */}
            </div>
        </>
    );
};

export default AdminDestinations;
