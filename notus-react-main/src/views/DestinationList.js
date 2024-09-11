import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbars/IndexNavbar";
import DestinationCard from "../components/Cards/DestinationCard"; // Import the DestinationCard component
import Footer from "components/Footers/Footer";

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch destinations from the backend
        const fetchDestinations = async () => {
            try {
                const response = await axios.get("/api/destinations");
                setDestinations(response.data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };

        fetchDestinations();
    }, []);

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
                                    <h1 className="text-white font-semibold text-5xl">
                                        Discover West Bengal's Hidden Gems
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">
                                        Plan your adventure with us and uncover the beauty of every corner of
                                        this enchanting state.
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
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DestinationList;
