import React, { useState, useEffect } from 'react';
import axios from 'axios';
// components

import CardStats from "components/Cards/CardStats.js";
import { useLocation } from "react-router-dom";

export default function HeaderStats() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalDestinations: 0,
    totalUsers: 0,
    totalTourPackages: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`/api/users/stats/${localStorage.getItem('userId')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);
  const location = useLocation();
  const isDashboard = location.pathname === "/user/dashboard";

  return (
    <>
      {isDashboard ? (
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="TOTAL BOOKINGS"
                    statTitle={stats.totalBookings.toString()}

                    statArrow="up"
                    statPercent="100"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
          </div>
        </div>
      )}
    </>

  );
}
