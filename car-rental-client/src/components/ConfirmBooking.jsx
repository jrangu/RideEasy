import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

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
    let Confirm = () => {
      var trip = new Object(this.props.trip);
      this.props.history.push({
        pathname: "/driverConfirmation",
        state: {
          tripDetails: JSON.stringify(trip)
        }
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
