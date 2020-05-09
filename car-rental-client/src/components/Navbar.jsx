import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import Badge from "react-bootstrap/Badge";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      activeLink: ""
    };
  }
  signOut = () => {
    const { onStateChange } = this.props;
    Auth.signOut()
      .then(res => {
        localStorage.clear();
        alert("Logged out");
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <div style={{ backgroundColor: "#C0C0C0" }}>
        <Container>
          <Row className="justify-content-md-center">
            <Badge variant="primary">
              <h1>Car Rental</h1>
            </Badge>
          </Row>
          <br />
          <Row>
            <Col>
              <Nav variant="pills" defaultActiveKey="/">
                  <Nav.Item>
                  <Nav.Link href="/SearchTrip">
                    <h3>Book a trip</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/bookingdetails">
                    <h3>Booking Details</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/bookingList">
                    <h3>Booking List</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/RiderNotification">
                    <h3>SMS Notifications</h3>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col md="auto">
              <Button onClick={this.signOut} href="/" className="signOutButton">
                <h3>SignOut</h3>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
