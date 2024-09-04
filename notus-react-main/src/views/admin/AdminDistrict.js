import React from "react";
import DistrictList from "./districtList";
// import AddDistrict from "./AddDistrict";


const AdminDistrict = () => {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4">
                    <DistrictList />
                </div>
                {/* <div className="w-full xl:w-4/12 px-4"><AddDistrict /></div> */}
            </div>
        </>
    );
};

export default AdminDistrict;
