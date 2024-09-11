import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { useHistory } from 'react-router-dom';

const EditAboutUs = () => {
  // const history = useHistory();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
    // Fetch the existing "About Us" content
    const fetchAboutUsContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/about-us', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const aboutUsData = response.data;
        setTitle(aboutUsData.title);
        setContent(aboutUsData.content);
      } catch (err) {
        setErrorMessage('Failed to fetch "About Us" content.');
      }
    };

    fetchAboutUsContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/admin/update-about-us', {
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage('About-Us Content Updated Successfully.')
      // history.push('/admin/about-us'); // Redirect to admin dashboard or any other page
    } catch (err) {
      setErrorMessage('Failed to update "About Us" content. Please try again.');
    }
  };

  const handleContentChange = (value) => {
    setContent(value);  // Rich text content in HTML format
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 bg-lightBlue-200">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">

            <div className="flex justify-between items-center mb-4 bg-gray-800 rounded-t-lg">
              <h2 className="text-xl font-bold">Edit About Us</h2>
              {successMessage && <p className="text-blueGray-500">{successMessage}</p>}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 p-2">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Content
                </label>
                {/* <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="10"
                /> */}
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  theme="snow"
                  placeholder="Write your content here..."
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-lightBlue-500 text-white px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAboutUs;
