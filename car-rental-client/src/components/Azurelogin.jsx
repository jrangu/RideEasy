import React, { Component } from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default class AzureLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "0",
      phoneNumber: "",
      role: "",
      userName: "",
      checkUserRider: "",
      onLoad: ""
    };
  }

  componentDidMount() {}

  getEmail = () => {
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({
        email: user.attributes.email,
        userName: user.attributes.email.substring(
          0,
          user.attributes.email.lastIndexOf("@")
        )
      });
      localStorage.setItem("Email", this.state.email);
      this.checkUser();
    });
  };

  setRoleDriver = () => {
    this.state.role = "Driver";
    this.state.phoneNumber = document.getElementById("phoneNumber").value;
    this.getEmail();
  };

  setRoleRider = () => {
    this.state.role = "Rider";
    this.state.phoneNumber = document.getElementById("phoneNumber").value;
    this.getEmail();
  };

  checkUser = () => {
    axios
      .get(
        "http://127.0.0.1:8080/" +
          "getUser" +
          "/" +
          this.state.email +
          "/" +
          this.state.role
      )
      .then(res => {
        if (res.data === "Driver") {
          this.props.history.push("/addTrip");
        } else if (res.data === "Rider") {
          this.props.history.push("/SearchTrip");
        } else {
          this.addUser();
        }
      })
      .catch(error => {
        console.log("error observed !!!" + error);
      });
  };

  addUser = () => {
    let formdata = new FormData();
    formdata.append("email", this.state.email);
    formdata.append("role", this.state.role);
    formdata.append("userName", this.state.userName);
    formdata.append("phoneNumber", this.state.phoneNumber);

    axios
      .post("http://127.0.0.1:8080/" + `/addUser`, formdata)
      .then(res => {
        if (this.state.role === "Driver") {
          this.props.history.push("/addTrip");
        } else if (this.state.role === "Rider") {
          this.props.history.push("/SearchTrip");
        }
      })
      .catch(error => {
        console.log("error observed !!!" + error);
      });
  };

  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "20%",
          width: "600px",
          transform: "translate(-20%, -20%)"
        }}
      >
        <h3>Enter Phone Number: </h3>
        <input
          type="tel"
          id="phoneNumber"
          style={{
            width: "300px",
            height: "50px"
          }}
          required
        />
        <br />
        <br />
        <button
          onClick={this.setRoleDriver}
          style={{
            backgroundColor: "#0000FF",
            width: "300px",
            height: "50px"
          }}
          id="Driver"
        >
          <h3>As driver</h3>
        </button>
        <br />
        <br />
        <button
          onClick={this.setRoleRider}
          style={{
            backgroundColor: "#0000FF",
            width: "300px",
            height: "50px"
          }}
          id="Rider"
        >
          <h3>As Rider</h3>{" "}
        </button>
      </div>
    );
  }
}
