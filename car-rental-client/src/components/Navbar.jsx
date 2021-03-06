import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import Badge from "react-bootstrap/Badge";
import Chatbot from "./Chatbot";

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
      <div style={{ backgroundColor: "#07a4ffc4"  }} >
        <Container>
          <Row className="justify-content-md-center" >
            {/* <Badge variant="primary"> */}
              <h1 >Ride Easy</h1>
            {/* </Badge> */}
          </Row>
          <br />
          <Row>
            <Col>
              <Nav variant="pills" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link href="/Searchtrip">
                    <h3>Book a trip</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/RiderBookingList">
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
              <Button onClick={this.signOut} href="/" className="signOutButton" style={{ backgroundColor: "#07a4ffc4"  }}>
                <h3>SignOut</h3>
              </Button>
            </Col>
          </Row>
        </Container>
        <Chatbot />
      </div>
    );
  }
}
