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
import TripList from "./components/TripList"
import SearchTrip from "./components/SearchTrip"

const oauth = {
  // Domain name
  domain: "project3.auth.us-east-2.amazoncognito.com",

  //client_id: "2q0jdht83jtkap8ipvuk316uvn",
  // Authorized scopes
  scope: ["email", "profile", "openid"],

  redirectSignIn: "http://localhost:3000/license",
  redirectSignOut: "http://localhost:3000",
  responseType: "code",

  // optional, for Cognito hosted ui specified options
  options: {
    // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
    AdvancedSecurityDataCollectionFlag: true
  }
};

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
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
