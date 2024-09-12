import React, { useState, useEffect } from "react";

const DistrictFilter = ({ onSelect }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch("/api/districtNameOnly");
      const data = await response.json();
      setDistricts(data);
    };
    fetchDistricts();
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="p-2 mt-4 bg-transparent text-white">
      <option value="" className="text-black bg-transparent">Select District</option>
      {districts.map((district) => (
        <option key={district._id} value={district.name} className="text-black bg-transparent">
          {district.name}
        </option>
      ))}
    </select>
  );
};

export default DistrictFilter;
