import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Descriptions} from "antd";
import "./driverConfirmation.css"
import axios from "axios"
import Navbar from "./Navbar";



export default class DriverConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   tripDetails: JSON.parse(this.props.location.state.tripDetails)

    trip: [],
      id: "",
      driverName: "",
      email: "",
      phoneNumber: "",
      licenseNumber: "",
      bookingId: this.props.location.state.bookingId,
      bookingDetails: {},
      //trip: JSON.parse(this.props.location.state.tripDetails)
      trip: {}
      //bookingData: JSON.parse(this.props.location.state.data)

    };
  }


  componentDidMount() {
    this.driverDetail();
    // console.log("details from trip list page" + JSON.stringify(this.state.tripDetails)); //uncomment to check the trip details
  }

  driverDetail =() => {
    console.log("bookingId", this.state.bookingId);
      var email = localStorage.getItem("Email");
      // console.log("obtained trip id from previous page ", this.props.location.state.tripDetails.id)
      console.log("details from booklist page" + JSON.stringify(this.state.trip.id));
    //   console.log("details from booklist page" + JSON.stringify(this.state.trip.driverId.license.licenseNumber));
    //   console.log("details from booklist page" + JSON.stringify(this.state.trip.driverId.phoneNumber));
      console.log("details from booklist page" + JSON.stringify(this.state.trip.carNumber));
      axios
      .get("http://localhost:8080/" + "getBookingById/" + this.state.bookingId)
      .then(res => {
        console.log("response list", res);
        return res;
      })
      .then(result => {
        console.log("res", result.data);
        if (result.data) {
          this.setState({ bookingDetails: result.data });
        }
      })
   .catch(error => {
        console.log(error);
      });
  };

  render() {
    var bookingDetails = new Object(this.state.bookingDetails);
    console.log("details is", bookingDetails )
    // console.log("seats id is", this.state.bookingDetails.tripId.seatsOffered)
    console.log("this.state.bookingId", this.state.bookingId);
    console.log("this.state.bookingDetails", this.state.bookingDetails);
    console.log("booking id is", this.state.bookingDetails.id)
    console.log("Trip id is", this.state.bookingDetails.tripId)
    console.log("Driver details is", this.state.bookingDetails.driverId)
    // console.log("Driver details is", this.state.bookingDetails.driverId.carNumber)
    var data = this.state.bookingDetails.tripId
    console.log("printing data", data)
    return (
      
 <div>
         <Navbar name={this.state.username} />
          <br>
          </br>
          <br></br>
          <h2  >  Driver Details Confirmation</h2>
          <br></br>
      
          <h4 align = "left">Your Trip has been successfully booked !!! Please find the driver details below... </h4>
          <div class = "driver_detail" align = "left">
      <Descriptions  title="Driver  Contact Details" >
      <Descriptions.Item label="Trip id">
      {data ? data.id: ""}
    </Descriptions.Item>
   
    <Descriptions.Item label="Driver Name" >{data ? data.driverId.license.fullName : ""}</Descriptions.Item>  
    <Descriptions.Item label="Vehicle Number" >{data ? data.carNumber : ""}</Descriptions.Item>
 <Descriptions.Item label="Driver email">{data ? data.driverId.email : ""}</Descriptions.Item>
    <Descriptions.Item label="Driver Phone">{data ? data.driverId.phoneNumber : ""}</Descriptions.Item>
   <Descriptions.Item label="Driver License Number">{data ? data.driverId.license.licenseNumber : ""}</Descriptions.Item>
     <Descriptions.Item label="Start Location " >{data ? data.startLocation : ""}</Descriptions.Item>  
       <Descriptions.Item label="End Location " >{data ? data.endLocation : ""}</Descriptions.Item> 
         <Descriptions.Item label="Trip Start time" >{data ? data.startDateTime : ""}</Descriptions.Item>   
  
  </Descriptions>
  </div>
  </div>
    );
  }
}

