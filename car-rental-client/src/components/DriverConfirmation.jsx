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
      trip: JSON.parse(this.props.location.state.tripDetails)
      

    };
  }


  componentDidMount() {
    this.driverDetail();
    // console.log("details from trip list page" + JSON.stringify(this.state.tripDetails)); //uncomment to check the trip details
  }
  driverDetail =() => {
      var email = localStorage.getItem("Email");
      // console.log("obtained trip id from previous page ", this.props.location.state.tripDetails.id)
      console.log("details from booklist page" + JSON.stringify(this.state.trip.id));
    //   console.log("details from booklist page" + JSON.stringify(this.state.trip.driverId.license.licenseNumber));
    //   console.log("details from booklist page" + JSON.stringify(this.state.trip.driverId.phoneNumber));
      console.log("details from booklist page" + JSON.stringify(this.state.trip.carNumber));
      axios
      .get("http://localhost:8080/" + "driverConfirmation?email=" + email + "&trip_id=" + this.state.trip.id)
      .then(res => {
        console.log("response list", res);
        return res;
      })
      .then(result => {
        console.log("res", result.data);
        if (result.data) {
          this.setState({ drivers: result.data });
        }
      })
   .catch(error => {
        console.log(error);
      });
  };

  render() {
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
      {this.state.trip.id}
    </Descriptions.Item>
   
    <Descriptions.Item label="Driver Name" >{this.state.trip.driverId.license.fullName}</Descriptions.Item>  
    <Descriptions.Item label="Vehicle Number" >{this.state.trip.carNumber}</Descriptions.Item>
    <Descriptions.Item label="Driver email">{this.state.trip.driverId.email}</Descriptions.Item>
    <Descriptions.Item label="Driver Phone">{this.state.trip.driverId.phoneNumber}</Descriptions.Item>
   <Descriptions.Item label="Driver License Number">{this.state.trip.driverId.license.licenseNumber}</Descriptions.Item>
  
  </Descriptions>
  </div>
  </div>
    );
  }
}

