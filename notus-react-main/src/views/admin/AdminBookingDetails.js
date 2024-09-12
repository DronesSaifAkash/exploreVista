import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import BookingStatus from '../../components/Cards/BookingStatus'; // Import the BookingStatus component

const AdminBookingDetails = () => {
    const { id } = useParams(); // This will get the booking ID from the URL
    const history = useHistory();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            setError('');
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in.');
                    setLoading(false);
                    history.push('/auth/login'); // Redirect to login if no token
                }

                const response = await axios.get(`/api/admin/booking/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 500) {
                    history.push('/auth/login');
                }

                setBooking(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching booking details');
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id, history]);


    if (loading) {
        // return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="container mx-auto p-4">
                            <h2 className="text-2xl font-semibold mb-4">Admin Booking Details</h2>
                            {booking && (
                                <div className="p-4 rounded-lg">
                                    <p><strong>Customer Name:</strong> {booking.userId.name}</p>
                                    <p><strong>Package Name:</strong> {booking.tourPackageId?.name || 'Loading...'}</p>
                                    <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                                    <p><strong>Package End Date:</strong> {new Date(booking.endDate).toLocaleString()}</p>
                                    <p><strong>Number of People:</strong> {booking.numberOfMembers}</p>
                                    <p><strong>Total Amount:</strong> {booking.totalPrice}</p>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                                    {/* Booking Status Component */}
                                    <BookingStatus booking={booking} />
                                </div>
                            )}
                        </div>

                        {/* Admin Actions */}
                        <div className="p-4 flex justify-between items-center">
                            <Link to="/admin/booking-list" className="text-blue-500 hover:underline">
                                <i className="fas fa-reply"></i> Back to Bookings
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookingDetails;
