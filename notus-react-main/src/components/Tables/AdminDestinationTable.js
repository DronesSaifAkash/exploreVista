import React from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminDestinationTable = ({ destinations }) => {
    const history = useHistory(); // useHistory for navigation

    const handleAddDestination = () => {
        history.push('/admin/add-destination');
    };

    const handleEditDestination = (id) => {
        history.push(`/admin/edit-destination/${id}`);
    };

    const handleDeleteDestination = async (id) => {
        try {
            const response = await axios.delete(`/api/admin/destinations/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                alert('Destination deleted successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting destination:', error);
            alert('Error deleting destination');
        }
    };

    // Define columns for the DataTable
    const columns = [
        {
            name: 'Image',
            selector: (row) => (
                <img
                    alt={row.name}
                    src={`http://localhost:5000/images/destinations/${row.image}`}
                    className="w-20 h-20 object-cover rounded"
                />
            ),
            sortable: false,
            width: '120px',
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Location',
            selector: (row) => row.location,
            sortable: true,
            // width: '200px',
        },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button
                        className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                        onClick={() => handleEditDestination(row._id)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 m-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this destination? This action cannot be undone.')) {
                                handleDeleteDestination(row._id);
                            }
                        }}
                    >
                        Delete
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '200px',
        },
    ];

    // Custom styles for the darker theme
    // const customStyles = {
    //     header: {
    //         style: {
    //             backgroundColor: '#1F2937', // Darker background for header
    //             color: '#FFF',
    //         },
    //     },
    //     headCells: {
    //         style: {
    //             backgroundColor: '#374151', // Dark background for header cells
    //             color: '#FFF',
    //             fontSize: '14px',
    //             fontWeight: 'bold',
    //         },
    //     },
    //     rows: {
    //         style: {
    //             backgroundColor: '#1F2937', // Dark background for rows
    //             color: '#FFF',
    //             '&:not(:last-of-type)': {
    //                 borderBottomColor: '#4B5563', // Border color between rows
    //             },
    //         },
    //     },
    //     pagination: {
    //         style: {
    //             backgroundColor: '#1F2937', // Dark background for pagination
    //             color: '#FFF',
    //         },
    //     },
    // };

    return (
        <div className="w-full text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                {/* Add Destination Button */}
                <div className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-darkGray-600">Destinations</h2>
                    <button
                        onClick={handleAddDestination}
                        className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                    >
                        Add Destination
                    </button>
                </div>

                {/* DataTable */}
                <div className="overflow-x-auto p-4">
                    <DataTable
                        columns={columns}
                        data={destinations}
                        pagination
                        highlightOnHover
                        responsive
                    // customStyles={customStyles} // Apply custom styles
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDestinationTable;
