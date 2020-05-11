import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Login from "./LoginComponent";
import Badge from "react-bootstrap/Badge";
import Chatbot from "./Chatbot";
import  "./login.css";

export default class Loginpage extends Component {
  render() {
    return (
      <div >
        <body className = "main-screen" >

        <Row className="justify-content-md-center">
          {/* <Badge variant="primary"> */}
            <h1>Ride-Easy</h1>
          {/* </Badge> */}
        </Row>
        <Login />
        <Chatbot />
        </body>
        
      </div>
    );
  }
}
