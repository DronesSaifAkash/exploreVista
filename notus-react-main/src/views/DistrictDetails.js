import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Link } from "react-router-dom";


Modal.setAppElement('#root');  // Important for accessibility

export default function DistrictDetails({ match }) {
    const [district, setDistrict] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchDistrictDetails = async () => {
            try {
                const response = await fetch(`/api/districts/${match.params.id}`);
                const data = await response.json();
                setDistrict(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching district details:", error);
                setLoading(false);
            }
        };

        fetchDistrictDetails();
    }, [match.params.id]);

    const openModal = (image) => {
        setCurrentImage(image);
        setModalIsOpen(true);
        console.log(modalIsOpen);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!district) {
        return <div>No district found</div>;
    }

    return (
        <>
            <Navbar transparent />
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('http://localhost:5000/images/banner/beach1.jpg')" }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-75 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <h1 className="text-white font-semibold text-5xl">Explore West Bengal's District: {district.name}</h1>
                        <p className="mt-4 text-lg text-blueGray-200">
                            Discover the unique characteristics of {district.name} district and plan your visit.
                        </p>
                    </div>
                </div>

                <section className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            {/* First box */}
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <img
                                        src={`/images/districts/${district.thumbnail_img}`} // Image source
                                        alt={district.name}
                                        className="w-40 h-200-px object-cover object-cover rounded-lg cursor-pointer"
                                        onClick={() => openModal(district.thumbnail_img)}
                                        title="Click to view the image"
                                    />
                                </div>
                            </div>
                            {/* Second box with description */}
                            <div className="lg:pt-12 pt-6 w-full md:w-8/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <h6 className="text-xl font-semibold">About {district.name}</h6>
                                        {district.description.map((point, index) => (
                                            <p className="text-blueGray-600 mt-4 text-left" key={index}>
                                                <i className={`${point.icon} mr-2`}></i>
                                                {point.text}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="px-4 py-5 flex-auto">
                                        <h6 className="text-xl font-semibold">Touring Spots</h6>
                                        <ul className="list-none text-blueGray-600 text-left mt-4">
                                            {district.touringSpots.map((spot, index) => (
                                                <li key={index} className="mb-4">
                                                    <i className="fas fa-map-signs mr-2 text-lightBlue-500"></i>
                                                    <strong>{spot.name}:</strong> {spot.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 text-right text-xl hover:opacity-85 hover:shadow-md">
                                        <Link to="/districts" title="Click to Back">
                                            <i className="fas fa-reply"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </section>

                {/* Modal for full-size image */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-transparent bg-opacity-75"
                >
                    <div className="relative bg-white p-4 rounded-lg">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 text-2xl border bg-black text-white p-2"
                        >
                            &times;
                        </button>
                        <img
                            src={`/images/districts/${currentImage}`}
                            alt="Full size"
                            className="max-w-full max-h-screen object-contain"
                        />
                    </div>
                </Modal>
            </main>
            <Footer />
        </>
    );
}
