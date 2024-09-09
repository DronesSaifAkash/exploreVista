import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminTourPackageList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tourPackages, setTourPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const history = useHistory();

    const handleAddClick = () => {
        history.push('/admin/add-tour-packages');
    };

    const handleEditClick = (id) => {
        history.push(`/admin/edit-tour-packages/${id}`);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this tour package?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/admin/tour-packages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTourPackages(tourPackages.filter(pkg => pkg._id !== id));
            } catch (err) {
                setError('Error deleting tour package');
            }
        }
    };

    const handleAvailabilityToggle = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/admin/tour-packages/${id}/availability`, {
                available: !currentStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTourPackages(tourPackages.map(pkg =>
                pkg._id === id ? { ...pkg, available: !currentStatus } : pkg
            ));
        } catch (err) {
            setError('Error updating availability');
        }
    };

    useEffect(() => {
        const fetchTourPackages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/admin/tour-packages', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTourPackages(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching tour packages');
                setLoading(false);
            }
        };

        fetchTourPackages();
    }, []);

    const filteredTourPackages = tourPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-wrap">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className='flex justify-between items-center mb-4 bg-gray-800 rounded-t-lg'>
                            <h2 className='text-xl font-bold'>Tour Packages</h2>
                            <button onClick={handleAddClick} className="bg-blueGray-600 text-white px-4 py-2 rounded">
                                Add New Package
                            </button>
                        </div>

                        <div className="mb-4 px-6">
                            <input
                                type="text"
                                placeholder="Search Tour Packages"
                                className="border-0 border-lightBlue-700 px-3 py-2 placeholder-blueGray-500 text-blueGray-600 bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}

                        <div>
                            {filteredTourPackages.map(pkg => (
                                <div key={pkg._id} className="rounded shadow w-full h-auto p-4 m-2 bg-blueGray-100">
                                    <div className="flex justify-between gap-2 ">
                                        <h3 className="text-xl text-lightBlue-600 border-b">{pkg.name}</h3>

                                        <p className={`text-sm p-2 rounded-full shadow-md border-blueGray-300 border  ${pkg.available ? 'text-blueGray-500' : 'text-red-500'} `}>
                                            {pkg.available ? 'Available' : 'Not Available'}
                                        </p>
                                    </div>
                                    <p className='text-sm p-2'>{pkg.description}</p>
                                    <p className='text-blueGray-500'>Price: <span className="text-blueGray-400 font-bold"> ${pkg.price} </span></p>
                                    <p className='text-blueGray-500 mb-2'>Duration: <span className="text-blueGray-400 font-bold"> {pkg.duration} </span></p>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEditClick(pkg._id)}
                                            className="bg-blueGray-600 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(pkg._id)}
                                            className="bg-red-600 text-white px-4 py-2 mx-4 rounded"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleAvailabilityToggle(pkg._id, pkg.available)}
                                            className={`px-4 py-2 rounded ${pkg.available ? 'bg-red-500' : 'bg-blueGray-600'} text-white`}
                                        >
                                            {pkg.available ? 'Mark as Not Available' : 'Mark as Available'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTourPackageList;
