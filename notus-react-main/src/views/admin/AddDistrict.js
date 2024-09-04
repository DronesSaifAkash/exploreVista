// src/views/admin/AddDistrict.js
import React, { useState } from 'react';
import axios from 'axios';

const AddDistrict = () => {
    const [newDistrict, setNewDistrict] = useState({
        code: '',
        name: '',
        thumbnail: '',
    });

    const handleChange = (e) => {
        setNewDistrict({ ...newDistrict, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('/api/admin/districts', newDistrict, {
            headers: { Authorization: token },
        });
        // Optionally reset the form or show a success message
    };

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4">Add New District</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="code"
                    value={newDistrict.code}
                    onChange={handleChange}
                    placeholder="Code"
                    className="input"
                />
                <input
                    name="name"
                    value={newDistrict.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="input"
                />
                <input
                    name="thumbnail"
                    value={newDistrict.thumbnail}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                    className="input"
                />
                <button type="submit" className="button">Add District</button>
            </form>
        </div>
    );
};

export default AddDistrict;
