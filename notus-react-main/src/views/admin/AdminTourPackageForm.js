import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminTourPackageForm = ({ onSubmit }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [available, setAvailable] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const token = localStorage.getItem('token');
            const tourPackage = { name, description, price, duration, available };

            const response = await axios.post('/api/admin/add-tour-packages', tourPackage, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status===500){
                window.location.href = '/auth/login';
            }
            
            if (response.status === 201) {
                alert('Tour Package added successfully!');
                history.push('/admin/tour-packages'); // Redirect after successful creation
              }

        } catch (err) {
            console.error('Error saving tour package:', err);
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    window.location.href = '/auth/login';
                } else if (err.response.status === 500) {
                    setErrorMessage('Failed to save tour package. Please try again.');
                }
            } else if (err.request) {
                setErrorMessage('No response from server. Please try again later.');
            } else {
                setErrorMessage('Error in request setup. Please try again.');
            }
        }
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">Add New Tour Package</h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap mt-6">
                        <div className="w-full lg:w-6/12 px-4 mb-3 ">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
                        </div>
                        <div className="w-full lg:w-6/12 px-4 mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="w-full lg:w-6/12 px-4 mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                min="0"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 px-4 mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="duration">Duration</label>
                            <input
                                id="duration"
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full lg:w-12/12 px-4 mb-3">
                            <div className="flex">
                                <input
                                    id="available"
                                    type="checkbox"
                                    checked={available}
                                    onChange={() => setAvailable(!available)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring  w-25 ease-linear transition-all duration-150"
                                />
                                <label className="block uppercase mx-4 text-blueGray-600 text-base font-bold mb-2" htmlFor="available">Available</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            Add Tour Package
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminTourPackageForm;
