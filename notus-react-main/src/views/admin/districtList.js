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
        <div className="flex flex-wrap">
            <div className="w-full px-4">
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Districts</h2>
                    <CardTable color="dark" data={districts} title={"District Table"} />
                </div>
            </div>
        </div>
    );
};

export default DistrictList;

