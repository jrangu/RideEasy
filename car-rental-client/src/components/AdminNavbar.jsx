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
      <div style={{ backgroundColor: "#07a4ffc4" }}>
        <Container>
          <Row className="justify-content-md-center">
            {/* <Badge variant="primary"> */}
              <h1>Ride Easy</h1>
            {/* </Badge> */}
          </Row>
          <br />
          <Row className = "navbar">
            <Col>
              <Nav variant="pills" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link href="/license">
                    <h3>Register License</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/AddTrip">
                    <h3>Add Trip</h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/driverTrips">
                    <h3>My trips</h3>
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
