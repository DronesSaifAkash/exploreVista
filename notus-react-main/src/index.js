import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import DistrictList from 'views/DistrictList';
import DestinationList from "views/DestinationList";
import PopularPlaces from 'views/PopularPlaces';
import TourPackageList from "views/TourPackageList";
import BookingPage from "views/BookingPage";
import User from "layouts/User";
import AboutUs from "views/AboutUs";
import DistrictDetails from "views/DistrictDetails";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Switch>
      {/* Add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/user" component={User} />
      {/* Add routes without layouts */}
      <Route path="/districts" exact component={DistrictList} />
      <Route path="/districts/:id" exact component={DistrictDetails} />
      <Route path="/PopularPlaces" exact component={PopularPlaces} />
      <Route path="/destinations" exact component={DestinationList} />
      <Route path="/about-us" exact component={AboutUs} />
      <Route path="/tours" exact component={TourPackageList} />
      <Route path="/tour-packages/:id" exact component={BookingPage} />
      
      
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* Add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);
