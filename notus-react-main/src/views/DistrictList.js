// DistrictList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbars/IndexNavbar";
import DistrictCard from "../components/Cards/DistrictCard";

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts");
        setDistricts(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
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
            <h1 className="text-white font-semibold text-5xl">Explore West Bengal's Districts</h1>
            <p className="mt-4 text-lg text-blueGray-200">
              Discover the unique characteristics of each district and plan your visit.
            </p>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {districts.map((district) => (
                <DistrictCard
                  key={district._id}
                  name={district.name}
                  thumbnail={district.thumbnail_img}
                  description={district.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DistrictList;
