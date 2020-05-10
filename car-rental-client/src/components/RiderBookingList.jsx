import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
// import { Auth } from "aws-amplify";
import Navbar from "./Navbar"


export default class RiderBookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      startLocation: "",
      endLocation: "",
      startDateTime: "",
      price:"",
      DriverName: "",
      DriverPhone: ""

    };
  }
  componentDidMount() {
   
    this.loadRiderBookingsList();
  }

  loadRiderBookingsList = () => {

    var email = localStorage.getItem("Email");
    console.log("inside license get" + email);
    axios
      .get("http://localhost:8080/" + "bookingsList?email=" + email)
      .then(res => {
        console.log("response list",res);
        return res;
      })
      .then(result => {
        console.log("res", result.data);
        if(result.data) {
          this.setState({ bookings: result.data });
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
          <tbody>
          {this.state.bookings.map(bookings => {
            return (
                <tr>
                  <td>{bookings.id}</td>
                  <td>{bookings.tripId.startLocation}</td>
                  <td>{bookings.tripId.endLocation}</td>
                  <td>{bookings.tripId.startDateTime}</td>
                  <td>{bookings.tripId.price}</td>
                  <td>{bookings.driverId.userName}</td>
                  <td>{bookings.driverId.phoneNumber}</td>
                    </tr>
              );
            })}
          </tbody>
           
        </Table>
      </div>

    );
  }
}

