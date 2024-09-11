import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Typed from 'typed.js';
import Slider from 'react-slick';

export default function Index() {

  // Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Type Script
  const element = useRef(null);
  useEffect(() => {
    const options = {
      strings: [
        '"Banglar mati, Banglar jol" West Bengal, India, is a mix of diverse cultures and civilizations. By developing necessary infrastructure, it promotes tourism in an integrated manner.'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
    };

    new Typed(element.current, options);
  }, []);

  // Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    try {
      await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setError('Error sending message. Please try again later.');
    }
  };

  const shadowStyle = {
    filter: 'drop-shadow(0px 1px 2px rgb(0 129 0 / 0.1)) drop-shadow(0 5px 3px rgb(0 130 0 / 0.3))'
  };

  return (
    <>
      <IndexNavbar fixed />

      {/* Hero Section */}
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 style={shadowStyle} className="font-semibold text-4xl text-blueGray-600 text-center ">
                Discover West Bengal: <span > Explore Vista </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-lightBlue-500">
                <div className="text-center text-md font-semibold" ref={element} />
              </p>
            </div>
          </div>
        </div>
        {/* src="http://localhost:5000/images/banner/beach1.jpg" */}
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png")}
          alt="..."
        />
      </section>

      <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')` }}>
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-25 bg-black"
        ></span>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Discover Your Next Adventure</h1>
          <p className="m-4 text-lg">Explore breathtaking destinations across West Bengal.</p>
          <Link to="/districts" className="mt-8 px-6 py-3 bg-lightBlue-500 text-white font-bold rounded shadow hover:bg-lightBlue-600">
            Explore Now
          </Link>
        </div>
      </section>
      {/* Slider Section */}
      <section className="py-24 bg-blueGray-800 text-white  h-screen">
        <div className="container mx-auto  text-center">
          <h2 className="text-4xl font-bold">Explore Our Gallery</h2>
          <p className="mt-4 mb-6">Discover stunning images from our travels and experiences.</p>
          <div className="w-full max-w-4xl mx-auto">
            <Slider {...settings}>
              <div className="relative p-2">
                <img
                  src="http://localhost:5000/images/gallery/ayodhyahill.jpg"
                  alt="ayodhya hill"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black hover:opacity-85 opacity-25 text-white">
                  <h3 className="text-xl font-semibold mb-2">Ajodhya Hills</h3>
                  <p className="text-base">A popular destination for young mountaineers.</p>
                </div>
              </div>
              <div className="relative p-2">
                <img
                  src="http://localhost:5000/images/gallery/darjeeling-trees.jpg"
                  alt="Image2"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black hover:opacity-85 opacity-25 text-white">
                  <h3 className="text-xl font-semibold mb-2">Darjeeling Trees</h3>
                  <p className="text-base"> Known for its lush green diversive forests.</p>
                </div>
              </div>
              <div className="relative p-2">
                <img
                  src="http://localhost:5000/images/gallery/rikshaw.jpg"
                  alt="Image3"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black hover:opacity-85 opacity-25 text-white">
                  <h3 className="text-xl font-semibold mb-2">Pulled Rickshaw</h3>
                  <p className="text-base">A traditional mode of transportation in Kolkata.</p>
                </div>
              </div>
              <div className="relative p-2">
                <img
                  src="http://localhost:5000/images/gallery/victoria.jpg"
                  alt="Image3"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black hover:opacity-85 opacity-25 text-white">
                  <h3 className="text-xl font-semibold mb-2">Victoria Memorial</h3>
                  <p className="text-base">A stunning example of Italian Renaissance architecture.</p>
                </div>
              </div>
              <div className="relative p-2">
                <img
                  src="http://localhost:5000/images/gallery/japanese-temple.jpg"
                  alt="Image3"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black hover:opacity-85 opacity-25 text-white">
                  <h3 className="text-xl font-semibold mb-2">Japanese Temple</h3>
                  <p className="text-base">Nipponzan Myohoji, located in Darjeeling, West Bengal</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <section className="bg-blueGray-200 py-24 h-screen">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Travelers Say</h2>
         
          {/* Responsive View */}
          <div className="block ">
            <Slider {...settings}>
              <div className="px-4">
                <div className="bg-white p-8 shadow-xl rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="mb-4 text-lightBlue-500">
                    <i className="fas fa-quote-left text-3xl"></i>
                  </div>
                  <p className="mb-6 text-blueGray-600 italic">
                    "This was the best trip I've ever taken! Everything was perfectly organized and stress-free. Will definitely book again."
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/images/users/team-2.jpg"
                      alt="John Doe"
                      className="rounded-full mr-4 w-12 h-12"
                    />
                    <div>
                      <h4 className="text-lg font-bold">John Doe</h4>
                      <p className="text-blueGray-400 text-sm">Traveler</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="mb-4 text-lightBlue-500">
                    <i className="fas fa-quote-left text-3xl"></i>
                  </div>
                  <p className="mb-6 text-blueGray-600 italic">
                    "Amazing experience with excellent customer service. The accommodations and itinerary were top-notch!"
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/images/users/team-3.jpg"
                      alt="Jane Smith"
                      className="rounded-full mr-4 w-12 h-12"
                    />
                    <div>
                      <h4 className="text-lg font-bold">Jane Smith</h4>
                      <p className="text-blueGray-400 text-sm">Adventurer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="bg-white p-8 shadow-xl rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="mb-4 text-lightBlue-500">
                    <i className="fas fa-quote-left text-3xl"></i>
                  </div>
                  <p className="mb-6 text-blueGray-600 italic">
                    "A trip of a lifetime! The guides were knowledgeable and friendly, and everything was handled professionally."
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/images/users/team-1.jpg"
                      alt="Alex Johnson"
                      className="rounded-full mr-4 w-12 h-12"
                    />
                    <div>
                      <h4 className="text-lg font-bold">Alex Johnson</h4>
                      <p className="text-blueGray-400 text-sm">Explorer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>


      {/* Contact Us Section */}
      <section className="pt-12 pb-32 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-24">
          <div className="flex flex-wrap justify-center ">
            <div className="w-full md:w-8/12 px-12 md:px-4 ml-auto mr-auto ">
              <div className="text-blueGray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">Contact Us</h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                If you have any questions or need further information, feel free to reach out to us using the form below.
              </p>
              <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-2xl hover:shadow-md p-4">
                <div className="mb-4">
                  <label className="block text-white text-base font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder='Enter Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-2xl hover:shadow-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-white text-base mb-2">Email</label>
                  <input
                    type="email"
                    placeholder='Enter Your Email'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-2xl hover:shadow-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-bold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-2xl hover:shadow-md"
                    required
                    placeholder='Enter Enquiry Headline..'
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-bold mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder='Please share your thoughts/ideas...'
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-2xl hover:shadow-md"
                    rows="4"
                    required
                  ></textarea>
                  {status && <p className="mt-4 text-bold rounded text-center text-xl text-white">{status}</p>}
                  {error && <p className="mt-4 text-bold rounded text-center text-xl text-red-500">{error}</p>}
                  <button
                    type="submit"
                    className="button bg-blueGray-800 shadow-2xl hover:shadow-md text-white  px-6 m-4  py-2 rounded"
                  >
                    Send Message
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
