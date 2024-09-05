import React, { useState } from 'react';
import axios from 'axios';

const AdminAddDestination = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        if (image) formData.append('image', image);

        try {
            await axios.post('/api/admin/destinations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle success (e.g., clear form or show message)
        } catch (error) {
            console.error('Error adding destination:', error);
        }
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="px-6 py-6">
                <h6 className="text-blueGray-700 text-xl font-bold">Add New Destination</h6>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                    >
                        Add Destination
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAddDestination;
