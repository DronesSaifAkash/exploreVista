// TourPackageList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbars/IndexNavbar";
import TourPackageCard from "../components/Cards/TourPackageCard";
import Footer from "components/Footers/Footer";

const TourPackageList = () => {
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await axios.get("/api/tour-packages");
        if(response.status === 500){
          window.location.href='/auth/login'
        }
        setTourPackages(response.data);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
      }
    };

    fetchTourPackages();
  }, []);

  return (
    <>
      <Navbar />
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
            <h1 className="text-white font-semibold text-5xl">Explore Our Tour Packages</h1>
            <p className="mt-4 text-lg text-blueGray-200">
              Find the best tour packages suited for your trip.
            </p>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {tourPackages.map((pkg) => (
                <TourPackageCard
                  key={pkg._id}
                  _id={pkg._id}
                  name={pkg.name}
                  description={pkg.description}
                  price={pkg.price}
                  duration={pkg.duration}
                  available={pkg.available}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TourPackageList;
