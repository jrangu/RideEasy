import React, { Component } from "react";
import AdminNavbar from "./AdminNavbar";
import Table from "react-bootstrap/Table";
import axios from "axios";

const SERVER_URI = "http://localhost:8080";

export default class DriverTripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      bookACar: false,
      rideList: []
    };
  }

  componentDidMount() {
    this.getDriverTripList();
  }

  getDriverTripList = () => {

    var email = localStorage.getItem("Email");
    axios
      .get(SERVER_URI + '/getDriverTrips/' + email)
      .then((response) => {
        console.log("ridelist" + JSON.stringify(response));
        this.setState({ rideList: response.data })
      })
      .catch((error) => {
        console.log(error);
        alert("Server Error");
      });
  }


  showRiders = (ride) => {

    var trip = new Object(ride);

    this.props.history.push({
      pathname: "/RidersForTrip",
      state: {
        riderDetails: JSON.stringify(ride),
      },
    });

    console.log("here at show riders");
  };


  handleCancel = (ride) => {

    console.log("here at act");
  };

  render() {

    
    return (
      <div>
        <AdminNavbar name={this.state.username}></AdminNavbar>
        <React.Fragment>
          <br />
          <h2>Your Trips</h2>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Car</th>
                <th>Start Location</th>
                <th>End Location</th>
                <th>Start Time</th>
                <th>Trip Price</th>
                <th>Seats Offered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rideList.map((ride) => (
                <tr key={ride.id}>
                  <td>
                    {" "}
                    <img
                      src={ride.imageURl}
                      width="400"
                      height="200"
                      alt="Vehicle"
                    />
                  </td>
                  <td>{ride.startLocation}</td>

                  <td>{ride.endLocation}</td>

                  <td>{new Date(ride.startDateTime).toLocaleString()}</td>
                  <td>${ride.price}</td>
                  <td>{ride.seatsOffered}</td>

                  <td>
                    <button
                      onClick={() => this.showRiders(ride)}
                      className="btn btn-primary"
                    >
                      Show Riders
                  </button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* <button
                      onClick={() => this.handleCancel(ride)}
                      className="btn btn-danger"
                    >
                      Cancel Trip
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      </div>
    );
  };


}   
