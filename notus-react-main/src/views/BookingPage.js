import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbars/IndexNavbar';
import Footer from '../components/Footers/Footer';
import { Link, useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
    const { id } = useParams();
    const [tourPackage, setTourPackage] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [numberOfMembers, setNumberOfMembers] = useState(1);
    const [discountApplied, setDiscountApplied] = useState('');
    const [loading, setLoading] = useState(true);
    const [endDate, setEndDate] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchTourPackage = async () => {
            try {
                const response = await axios.get(`/api/users/tour-packages/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.status === 500) {
                    window.location.href = '/auth/login';
                }
                setTourPackage(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tour package:', error);
                setLoading(false);
            }
        };

        fetchTourPackage();
    }, [id]);

    const parseDuration = (durationString) => {
        const match = durationString.match(/(\d+)\s*Days?/);
        return match ? parseInt(match[1], 10) : 0;
    };

    useEffect(() => {
        if (startDate && tourPackage) {
            const durationInDays = parseDuration(tourPackage.duration);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + durationInDays);
            setEndDate(endDate);
        }
    }, [startDate, tourPackage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            alert('Please log in to make a booking.');
            history.push('/auth/login');
            return;
        }

        try {
            
            const response = await axios.post('/api/users/book', {
                userId, 
                tourPackageId: id,
                visitDate: startDate,
                endDate: endDate,
                numberOfMembers: numberOfMembers,
                discountApplied: discountApplied
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.status === 201) {
                alert('Booking successful!');
                history.push('/user/bookings');
            }
        } catch (error) {
            alert('Error making booking: ' + error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!tourPackage) {
        return <p>Tour package not found</p>;
    }

    return (
        <>
            <Navbar transparent />
            <main className="profile-page mt-4">
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-8/12 px-4">
                                        <div className="text-center mt-12">
                                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                {tourPackage.name}
                                            </h3>
                                            <p className="mt-4 text-lg text-blueGray-600">{tourPackage.description}</p>
                                        </div>
                                        <form onSubmit={handleSubmit} className="bg-blueGray-200 p-4 mb-6 rounded-lg shadow-lg mt-10">
                                            <h3 className="text-2xl font-semibold text-blueGray-700 mb-4">Book Your Tour</h3>
                                            <p className="mb-4">Tour Package: <strong>{tourPackage.name}</strong></p>
                                            <p className="mb-4">Duration: {tourPackage.duration}</p>
                                            <p className="mb-4">Price: ${tourPackage.price}</p>

                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-blueGray-600">Start Date:</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    className="w-full px-4 py-2 mt-2 text-blueGray-700 bg-white border rounded-lg"
                                                    dateFormat="MMMM d, yyyy"
                                                    minDate={new Date()}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-blueGray-600">End Date:</label>
                                                <input
                                                    type="text"
                                                    value={endDate ? endDate.toDateString() : ''}
                                                    readOnly
                                                    className="w-full px-4 py-2 mt-2 text-blueGray-700 bg-white border rounded-lg"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-blueGray-600">Number of Members:</label>
                                                <input
                                                    type="number"
                                                    value={numberOfMembers}
                                                    onChange={(e) => setNumberOfMembers(e.target.value)}
                                                    className="w-full px-4 py-2 mt-2 text-blueGray-700 bg-white border rounded-lg"
                                                    min="1"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-blueGray-600">Discount Code (if any):</label>
                                                <input
                                                    type="text"
                                                    value={discountApplied}
                                                    onChange={(e) => setDiscountApplied(e.target.value)}
                                                    className="w-full px-4 py-2 mt-2 text-blueGray-700 bg-white border rounded-lg"
                                                />
                                            </div>
                                            <div className='flex justify-between'>
                                                <button
                                                    type="submit"
                                                    className="w-75 mt-4 px-6 py-3 bg-lightBlue-500 text-white font-bold rounded-lg shadow-xl hover:shadow-md transition-all duration-200"
                                                >
                                                    Book Now
                                                </button>
                                                <Link to="/tours">
                                                    <button
                                                        className="w-75 mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-xl hover:shadow-md transition-all duration-200"
                                                    >
                                                        Back to Tours
                                                    </button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BookingPage;
