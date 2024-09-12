import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';

const AdminBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchBookings = async () => {
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in.');
                    setLoading(false);
                    window.location.href = '/auth/login';
                    return;
                }

                const response = await axios.get('/api/admin/bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 500) {
                    window.location.href = '/auth/login';
                    return;
                }

                setBookings(response.data);
                setFilteredBookings(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.err && err.response.data.err.name === 'TokenExpiredError') {
                    setError('Session has expired. Please log in again.');
                    localStorage.removeItem('token');
                    window.location.href = '/auth/login';
                } else {
                    setError('Error fetching bookings');
                }
                console.error('Error fetching bookings:', err);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const result = bookings.filter(booking => {
            const packageName = booking.tourPackageId?.name || '';
            return packageName.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredBookings(result);
    }, [searchText, bookings]);

    const columns = [
      
        {
            name: 'User Name',
            selector: row => row.userId?.name || 'N/A',
            sortable: true,
        },
        {
            name: 'Tour Package',
            selector: row => row.tourPackageId?.name || 'N/A',
            sortable: true,
        },
        {
            name: 'Visit Date',
            selector: row => new Date(row.visitDate).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => new Date(row.endDate).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Number of Members',
            selector: row => row.numberOfMembers,
            sortable: true,
        },
        {
            name: 'Total Price',
            selector: row => `₹ ${row.totalPrice}`,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => `${row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()}`,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <button
                    onClick={() => handleView(row._id)}
                    className="bg-blueGray-600 text-white border hover:shadow-md px-2 py-2 rounded"
                >
                    View Details
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleView = (id) => {
        history.push(`/admin/booking/${id}`);
    };

    return (
        <div className="flex flex-wrap">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="container mx-auto p-4">
                            <div className="flex justify-between flex-wrap items-center">
                                <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search by Package Name..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="form-input mt-1 block w-25 border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p className="text-red-500">{error}</p>}

                            <DataTable
                                columns={columns}
                                data={filteredBookings}
                                pagination
                                highlightOnHover
                                responsive
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookingList;
