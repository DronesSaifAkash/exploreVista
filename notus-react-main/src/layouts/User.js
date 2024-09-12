import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import UserNavbar from "components/Navbars/UserNavbar.js";
import Sidebar from "components/Sidebar/UserSidebar.js";
import HeaderStats from "components/Headers/UserHeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin.js";
// views
import Dashboard from "views/user/Dashboard.js";
import UserContactList from "views/user/ConatactsList.js";
import UserContactDetail from "views/user/UserContactDetail";
import BookingList from "views/user/BookingList";
import BookingDetails from "views/user/BookingDetails";

export default function User() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <UserNavbar />
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/user/dashboard" exact component={Dashboard} />

                        <Route path="/user/contacts-list" exact component={UserContactList} />
                        <Route path="/user/contacts/:id" exact component={UserContactDetail} />
                        <Route path="/user/booking-packages" exact component={BookingList} />
                        <Route path="/user/bookings/:id" exact component={BookingDetails} />
                        
                        <Redirect from="/user" to="/user/dashboard" />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
