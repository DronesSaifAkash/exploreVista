///// src/views/admin/DistrictList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardTable from 'components/Cards/CardTable';

const DistrictList = () => {
    const [districts, setDistricts] = useState([]);

    const fetchDistricts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/auth/login';
                return;
            }
            const response = await axios.get('/api/admin/districts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);

            if (response.status === 500) {
                window.location.href = '/auth/login';
            }
            setDistricts(response.data);
        } catch (error) {
            window.location.href = '/auth/login';
            console.error("There was an error fetching the districts!", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    return (
        <div className="w-full text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-darkGray-600">Districts</h2>
                </div>
                <div className="overflow-x-auto p-4">

                    <CardTable color="light" data={districts} title={"Districts"} />
                </div>
            </div>
        </div>
    );
};

export default DistrictList;

