import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const AdminEditTourPackage = () => {
    const { id } = useParams(); // Get the tour package ID from the URL
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
        // Fetch the existing tour package details
        const fetchTourPackage = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/admin/tour-packages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const tourPackage = response.data;
                setName(tourPackage.name);
                setDescription(tourPackage.description);
                setPrice(tourPackage.price);
                setDuration(tourPackage.duration);
            } catch (err) {
                setErrorMessage('Failed to fetch tour package details.');
            }
        };

        fetchTourPackage();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/admin/edit-tour-packages/${id}`, {
                name,
                description,
                price,
                duration
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            history.push('/admin/tour-packages'); // Redirect to tour packages list
        } catch (err) {
            setErrorMessage('Failed to update tour package. Please try again.');
        }
    };

    return (
        <div className="flex flex-wrap">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">


                        <div className="flex justify-between items-center mb-4 bg-gray-800 rounded-t-lg">
                            <h2 className="text-xl font-bold">Edit Tour Package</h2>

                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 p-2">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditTourPackage;
