import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UserContactDetail = () => {
    const { id } = useParams(); // This will get the contact ID from the URL
    const history = useHistory();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [content, setContent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchContact = async () => {
            setError('');
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in.');
                    setLoading(false);
                    history.push('/auth/login'); // Redirect to login if no token
                }

                const response = await axios.get(`/api/users/contacts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 500) {
                    history.push('/auth/login');
                }

                setContact(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching contact details');
                setLoading(false);
            }
        };

        fetchContact();
    }, [id, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/api/users/contacts/${id}/reply`, { content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 500) {
                window.location.href = '/auth/login';
            }
            if (response.status === 200) {
                setSuccessMessage('Message sent successfully!');
                setContent(''); // Clear the form after submission
            }
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error sending message');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
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
                            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
                            {contact && (
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <p><strong>Name:</strong> {contact.name}</p>
                                    <p><strong>Email:</strong> {contact.email}</p>
                                    <p><strong>Subject:</strong> {contact.subject}</p>
                                    <p><strong>Message:</strong> {contact.message}</p>
                                    <p><strong>Date:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        <div className="container mx-auto p-4">
                            {contact.replies.length > 0 && (
                                <div className='rounded-t bg-blueGray-200 mb-0 px-6 py-6'>
                                    <h2><strong>Replies:</strong></h2>
                                    {contact.replies.map((reply, index) => (
                                        <div key={index} className={`reply p-2 rounded-t m-4 shadow ${reply.replyBy ? 'bg-gray-100' : 'bg-blue-100'}`}> <p><strong>{reply.replyBy ? 'Admin Reply' : 'User Reply'} <small> [ {new Date(reply.repliedAt).toLocaleString()} ]</small> :</strong></p>
                                            <p>{reply.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="container mx-auto p-4">
                            <div className='rounded-t bg-white shadow-2xl mb-0 px-6 py-6'>
                                <h2 className="text-2xl font-semibold mb-4">Send Message to Admin</h2>
                                {successMessage && <p className="text-green-500">{successMessage}</p>}
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="bg-blueGray-600 mx-auto text-white px-4 py-2 rounded">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContactDetail;
