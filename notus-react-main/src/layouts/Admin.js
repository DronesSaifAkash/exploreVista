import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import AdminDistrict from "views/admin/AdminDistrict";
import AdminDestinations from "views/admin/AdminDestinations";
import AdminAddDestinationForm from "views/admin/AdminAddDestinationForm";
import AdminEditDestinationForm from "views/admin/AdminEditDestinationForm";
import AdminContactList from "views/admin/AdminContactList";
import AdminContactDetail from "views/admin/AdminContactDetail";
import AdminTourPackageList from "views/admin/AdminTourPackageList";
import AdminTourPackageForm from "views/admin/AdminTourPackageForm";
import AdminEditTourPackage from "views/admin/AdminEditTourPackage";
import EditAboutUs from "views/admin/EditAboutUs";
import AdminBookingList from "views/admin/AdminBookingList";
import AdminBookingDetails from "views/admin/AdminBookingDetails";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/districts" component={AdminDistrict} />

            <Route path="/admin/destinations" component={AdminDestinations} />
            <Route path="/admin/add-destination" component={AdminAddDestinationForm} />
            <Route path="/admin/edit-destination/:id" component={AdminEditDestinationForm} />

            <Route path="/admin/contacts-list" component={AdminContactList} />
            <Route path="/admin/contacts/:id" exact component={AdminContactDetail} />

            <Route path="/admin/tour-packages" exact component={AdminTourPackageList} />
            <Route path="/admin/add-tour-packages" exact component={AdminTourPackageForm} />
            <Route path="/admin/edit-tour-packages/:id" exact component={AdminEditTourPackage} />

            <Route path="/admin/booking-list" exact component={AdminBookingList} />
            <Route path="/admin/booking/:id" exact component={AdminBookingDetails} />

            <Route path="/admin/about-us" exact component={EditAboutUs} />


            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
