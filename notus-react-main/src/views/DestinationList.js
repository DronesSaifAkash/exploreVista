import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbars/IndexNavbar";
import DestinationCard from "../components/Cards/DestinationCard"; // Import the DestinationCard component
import Footer from "components/Footers/Footer";
import DistrictFilter from "../components/Cards/DistrictFilter";

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [district, setDistrict] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const fetchDestinations = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/destinations?page=${page}&district=${district}`);
            const data = await response.json();
            setDestinations(data.destinations);
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching destinations:", error);
            setLoading(false);
        }
    }, [district]);

    useEffect(() => {
        fetchDestinations(currentPage);  // Fetch data when currentPage or district changes
    }, [currentPage, district, fetchDestinations]);

    const handleDistrictSelect = (selectedDistrict) => {
        setDistrict(selectedDistrict);
        setCurrentPage(1);  // Reset to first page when filtering
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        // return <div>Loading...</div>;
    }

    const handleClear = () => {
        window.location.reload(); 
    };

    return (
        <>
            <Navbar />
            <main>
                {/* Hero Section */}
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-75 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h2 className="text-white font-semibold text-5xl">
                                        Discover West Bengal's Hidden Gems
                                    </h2>
                                    <p className="mt-4 text-lg text-blueGray-200 flex justify-between items-center mx-auto my-auto">
                                        Filter &nbsp;
                                        <DistrictFilter onSelect={handleDistrictSelect} />
                                        <button onClick={handleClear} className="text-blue-500 no-underline hover:underline flex items-center">
                                            <i className="fas fa-times-circle mr-2"></i>
                                            Clear
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </div>

                <section className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            {/* Dynamically render destination cards */}
                            {destinations.map((destination) => (
                                <DestinationCard key={destination._id} destination={destination} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 mx-2 border rounded"
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 mx-2 border rounded"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DestinationList;
