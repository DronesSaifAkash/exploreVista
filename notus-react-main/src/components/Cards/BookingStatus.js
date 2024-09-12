import React, { useState } from 'react';
import axios from 'axios';

const BookingStatus = ({ booking }) => {
    const [status, setStatus] = useState(booking.status);

    const handleStatusChange = async (newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `/api/admin/booking-status/${booking._id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStatus(newStatus); // Update the status locally after the API call
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    return (
        <div className="my-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Booking Status</label>
            <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="border p-2 rounded w-full"
            >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="canceled">Canceled</option>
            </select>
        </div>
    );
};

export default BookingStatus;
