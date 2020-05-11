import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import amplify from "aws-amplify";
import { I18n } from "aws-amplify";
import config from "./config";
import Loginpage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterLicence from "./components/RegisterLicense";
import RentCarPage from "./components/RentCarPage";
// import Admin from "./components/Admin";
import BookingDetails from "./components/BookingDetails";
import TripList from "./components/TripList";
import DriverTripList from "./components/DriverTripList";
import SearchTrip from "./components/SearchTrip";
import AddTrip from "./components/AddTripForm";
import RiderBookingList from "./components/RiderBookingList";
import RidersForTrip from "./components/RidersForTrip";
import RidersForDriver from "./components/RidersForDriver";
import DriverConfirmation from "./components/DriverConfirmation";
import { Form } from "antd";
import Azurelogin from "./components/Azurelogin";
import { Auth } from "aws-amplify";
import RiderNotification from "./components/RiderNotification"

const oauth = {
  // Domain name
  domain: "project1.auth.us-east-2.amazoncognito.com",

  //client_id: "2q0jdht83jtkap8ipvuk316uvn",
  // Authorized scopes
  scope: ["email", "profile", "openid"],

  redirectSignIn: 'https://rideeasy.filestorage-manishayacham.com/Azurelogin',
  redirectSignOut: 'https://rideeasy.filestorage-manishayacham.com/',
  responseType: "code",

  // optional, for Cognito hosted ui specified options
  options: {
    // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
    AdvancedSecurityDataCollectionFlag: true
  }
};

const WrappedAddTrip = Form.create({ name: "addTrip" })(AddTrip);
const authScreenLabels = {
  en: {
    "Sign in with AWS": "Sign in with Microsoft"
  }
};

I18n.setLanguage("en");
I18n.putVocabularies(authScreenLabels);

amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: oauth
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={Loginpage} />
    {/* <Route exact path="/admin" component={Admin} /> */}
    <Route exact path="/license" component={RegisterLicence} />
    <Route exact path="/rentpage" component={RentCarPage} />
    <Route exact path="/bookingdetails" component={BookingDetails} />
    <Route exact path="/TripList" component={TripList} />
    <Route exact path="/SearchTrip" component={SearchTrip} />
    <Route exact path="/AddTrip" component={WrappedAddTrip} />
    <Route exact path="/Azurelogin" component={Azurelogin} />
    <Route exact path="/driverTrips" component={DriverTripList} />
    <Route exact path="/RiderBookingList" component={RiderBookingList} />
    <Route exact path = "/RidersForTrip" component={RidersForTrip}/>
    <Route exact path = "/RidersForDriver" component={RidersForDriver}/>
    <Route exact path = "/DriverConfirmation" component={DriverConfirmation}/>
    <Route exact path = "/RiderNotification" component={RiderNotification}/>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
