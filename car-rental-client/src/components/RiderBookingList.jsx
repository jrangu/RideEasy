import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import { Auth } from "aws-amplify";
// import moment from "moment";


export default class RiderBookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      startLocation: "",
      endLocation: "",
      startDateTime: "",
      DriverName: "",
      DriverPhone: ""

    };
  }
//   componentDidMount() {
//     let currentUser = localStorage.getItem("currentUser");
//     console.log("currentUser", currentUser)
//     this.loadUserBookingsList();
//   }


 

  render() {
    return (

      <div>
        <br></br>
        <h3 align="center">Riders Bookings List</h3>
        <br />
        <br />
        <Table striped bordered hover size="xl">
          <thead class="table table-striped">
            <tr>
              <th># Booking Id</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Trip date & time</th>
              <th>Price</th>
              <th>Driver Name</th>
              <th>Driver phone Number</th>
            </tr>
          </thead>
          
           
        </Table>
      </div>

    );
  }
}

