// src/views/admin/DistrictList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardTable from 'components/Cards/CardTable';

const DistrictList = () => {
    const [districts, setDistricts] = useState([]);

    const fetchDistricts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.get('/api/admin/districts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDistricts(response.data);
        } catch (error) {
            console.error("There was an error fetching the districts!", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    return (
        <div className="w-full text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-lightBlue-200 w-full mb-8 shadow-lg rounded-lg">
            <div className="flex justify-between items-starts mb-4 p-4 bg-gray-800 rounded-t-lg">
                {/* <h2 className="text-xl font-semibold text-darkGray-600">Districts</h2> */}
                    <CardTable color="light" data={districts} title={"Districts"} />
                </div>
            </div>
        </div>
    );
};

export default DistrictList;

