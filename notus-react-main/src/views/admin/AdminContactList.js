import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const AdminContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            setError('')
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in.');
                    setLoading(false);
                    return;
                }
                const response = await axios.get('/api/admin/contacts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setContacts(response.data);
                setFilteredContacts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching contacts:', err);
                setError('Error fetching contacts');
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const result = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredContacts(result);
    }, [searchText, contacts]);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: false,
        },
        {
            name: 'Date',
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <button
                    onClick={() => handleView(row._id)}
                    className="bg-blue-500 text-black border hover:shadow-md px-4 py-2 rounded"
                >
                    View
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const handleView = (id) => {
        alert(`Viewing contact with id: ${id}`);
    };

    return (
        <div className="flex flex-wrap">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="container mx-auto p-4">
                            <div className="flex  justify-between flex-wrap items-center justify-content">
                                <h2 className="text-2xl font-semibold mb-4">Contact Submissions</h2>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search..."
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
                                data={filteredContacts}
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

export default AdminContactList;
