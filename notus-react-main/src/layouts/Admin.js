import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AdminDistrict from "views/admin/AdminDistrict";
import AdminDestinations from "views/admin/AdminDestinations";
import AdminAddDestinationForm from "views/admin/AdminAddDestinationForm";
import AdminEditDestinationForm from "views/admin/AdminEditDestinationForm";
import AdminContactList from "views/admin/AdminContactList";

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
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/districts" component={AdminDistrict} />
            <Route path="/admin/destinations" component={AdminDestinations} />
            <Route path="/admin/add-destination" component={AdminAddDestinationForm} />
            <Route path="/admin/edit-destination/:id" component={AdminEditDestinationForm} />
            <Route path="/admin/contacts-list" component={AdminContactList} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
