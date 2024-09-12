import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useHistory, useParams } from 'react-router-dom';

const AdminEditDestinationForm = () => {
  const { id } = useParams(); // Get ID from URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(''); // To display current image
  const history = useHistory();

  const handleContentChange = (value) => {
    setDescription(value);  // Rich text content in HTML format
  };

  useEffect(() => {
    // Fetch existing destination data
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`/api/admin/destinations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        setName(data.name);
        handleContentChange(data.description);
        setLocation(data.location);
        setRating(data.rating);
        setCurrentImage(data.image); // Set the current image URL
      } catch (error) {
        console.error(error);
        alert('Error fetching destination data');
      }
    };

    fetchDestination();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('rating', rating);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`/api/admin/destinations/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.status === 500) {
        window.location.href = '/auth/login';
      }
      if (response.status === 200) {
        alert('Destination updated successfully!');
        history.push('/admin/destinations'); // Redirect after successful update
      }
    } catch (error) {
      console.error(error);
      alert('Error updating destination');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center">
          <h6 className="text-blueGray-700 text-xl font-bold">Edit Destination</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Destination Information
          </h6>
          <div className="flex flex-wrap">
            {/* Form Fields */}
            <div className="w-full lg:w-6/12 px-4 mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full lg:w-6/12 px-4 mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="w-full lg:w-10/12 px-4 mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">Description</label>
              <ReactQuill
                id="description"
                value={description}
                onChange={handleContentChange}
                theme="snow"
                placeholder="Write your content here..."
              />
            </div>


            <div className="w-full lg:w-6/12 px-4 mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            
            <div className="w-full lg:w-6/12 px-4 mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="rating">Rating</label>
              <input
                id="rating"
                type="number"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required min="1"
              />
            </div>
            <div className='w-full lg:w-6/12 px-4 mb-3'>
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="image">Current Image</label>
              {currentImage && (
                <div className="mb-3">
                  <img src={`http://localhost:5000/images/destinations/${currentImage}`} alt="Current" className="w-20 h-95-px object-cover" />
                </div>
              )}
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Update Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditDestinationForm;
