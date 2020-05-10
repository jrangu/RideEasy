import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";

import config from "../../src/config";

export default class ConfirmBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      filename: this.props.filename
    };
  }
  render() {
    let Close = () => {
      this.setState({ open: false });
      window.location = "/TripList";
    };

    let handleShow = () => {
      this.setState({ open: true });
    };

    let Confirm = event => {
      event.preventDefault();
      var trip = new Object(this.props.trip);
      console.log(JSON.stringify(trip));
      var bookingData = new FormData();
      bookingData.append("tripId", trip.id);
      bookingData.append("riderEmail", localStorage.getItem("Email"));
      bookingData.append("driverId", trip.driverId.id);
      axios
        .post(config.BackendUrl + "addBooking", bookingData)
        .then(response => {
          let res = response;
          console.log("res****", res);
          console.log("response", res.data);
          if (res.data === -1) {
            console.log("checking111" + response);
            alert("Server error")
            this.setState({ open: false });
            window.location = "/TripList";
          } else {
            console.log("checking" + res);
            this.props.history.push({
              pathname: "/driverConfirmation",
              state: {
                tripDetails: JSON.stringify(res.data)
              }
            });
          }
        })
        .catch(error => {
          console.log("Error " + JSON.stringify(error));
          alert("Server error")
          this.setState({ open: false });
          window.location = "/TripList";
        });
      console.log("here at handle booking");
    };

    return (
      <div>
        <Button className="btn btn-primary" onClick={handleShow}>
          Book Trip
        </Button>

        <Modal show={this.state.open} onHide={Close}>
          <Modal.Header closeButton>
            <Modal.Title>Booking confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confirm to book?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
            <Button variant="primary" onClick={Confirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
