import React, { Component } from "react";
import Navbar from "./Navbar";
import Table from "react-bootstrap/Table";
import ConfirmBooking from "./ConfirmBooking";

export default class TripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookACar: false,
      tripList: JSON.parse(this.props.location.state.data)
    };
  }

  handleBooking = trip => {
    var trip = new Object(trip);

    this.props.history.push({
      pathname: "/driverConfirmation",
      state: {
        tripDetails: JSON.stringify(trip)
      }
    });

    console.log("here at handle booking");
  };

  render() {
    let date = this.state.tripList.map(trip =>
      new Date(trip.startDateTime).toLocaleString()
    );

    return (
      <div>
        <Navbar name={this.state.username}></Navbar>
        <React.Fragment>
          <br />
          <h2>List Of Trips</h2>
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
                <th>Driver Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tripList.map(trip => (
                <tr key={trip.id}>
                  <td>
                    {" "}
                    <img
                      src={trip.imageURl}
                      width="400"
                      height="200"
                      alt="Vehicle"
                    />
                  </td>
                  <td>{trip.startLocation}</td>

                  <td>{trip.endLocation}</td>

                  <td>{date}</td>
                  <td>{trip.price}</td>
                  <td>{trip.seatsOffered}</td>

                <td>
                  Driver Name : {trip.driverId.fullName}
                  <br></br>
                  Phone Number : {trip.driverId.phoneNumber}
                  <br></br>
                </td>

                  <td>
                    {/* <button
                    onClick={() => this.handleBooking(trip)}
                    className="btn btn-primary"
                  >
                    Book Trip
                  </button> */}
                    <ConfirmBooking trip={trip} history={this.props.history} />
                    <br></br>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      </div>
    );
  }
  //   }
}
