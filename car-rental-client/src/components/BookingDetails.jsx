import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import axios from "axios";
import config from "../../src/config";
import { Button } from "react-bootstrap";

export default class BookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails: [],
      // tripDetails: JSON.parse(this.props.location.state.tripDetails), //uncomment to check the trip details
    };
  }
  componentDidMount() {
    this.reloadFileList();
    // console.log("details from trip list page" + JSON.stringify(this.state.tripDetails)); //uncomment to check the trip details
  }

  reloadFileList = () => {
    axios
      .get(
        config.BackendUrl + "/listDetails/" + localStorage.getItem("userName")
      )
      .then((res) => {
        this.setState({ bookingDetails: res.data });
      })
      .catch((error) => {
        console.log(error);
        alert("ServerConnection failure");
      });
  };
  cancelBooking = (id) => {
    axios
      .delete(config.BackendUrl + "/cancelBooking/" + id)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Navbar name={this.state.username} />
        <br />
        <h2>Booking Details</h2>
        <br />
        <Table striped bordered hover size="xl">
          <thead>
            <tr>
              <th>Driving License</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>CarType</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookingDetails.map((bookingDetails) => (
              <tr id={bookingDetails.id}>
                <td>{bookingDetails.license}</td>
                <td>{bookingDetails.firstname}</td>
                <td>{bookingDetails.lastname}</td>
                <td>{bookingDetails.startDate}</td>
                <td>{bookingDetails.endDate}</td>
                <td>{bookingDetails.carType}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.cancelBooking(bookingDetails.id)}
                  >
                    CANCEL
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
