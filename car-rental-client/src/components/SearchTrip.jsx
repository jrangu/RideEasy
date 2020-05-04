import React, { Component } from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";

export default class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcLocation: "",
      destLocation: "",
      data: []
    };
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  componentDidMount() {
    console.log(localStorage.getItem("Email"));
  }

  callSearchTripApi = event => {
    event.preventDefault();
    let URL =
      "http://localhost:8080/searchTrips/" +
      this.state.srcLocation +
      "/" +
      this.state.destLocation;
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        console.log("check search data" + JSON.stringify(response));
        // this.setState({
        //     data: response
        // });
        this.props.history.push({
          pathname: "/TripList",
          state: {
            data: JSON.stringify(response)
          }
        });
      })
      .catch(error => {
        console.log("Error" + error);
      });
  };

  render() {
    return (
      <div>
        <form>
          <div>
            {" "}
            <Navbar name={this.state.username} />
          </div>
          <div
            style={{
              position: "absolute",
              left: "15%",
              top: "25%",
              width: "600px",
              transform: "translate(-20%, -20%)"
            }}
          >
            <br />
            <h2 style={{ font: " serif" }}> SEARCH FOR A TRIP </h2>
            <br />
            <h6>
              {" "}
              Start Location: &nbsp;&nbsp;
              <input
                type="text"
                id="srcLocation"
                name="srcLocation"
                style={{ width: "40%", height: "30px" }}
                required
                value={this.state.srcLocation}
                onChange={this.onInputChange}
              />
            </h6>
            <br />
            <h6>
              End Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="destLocation"
                name="destLocation"
                style={{ width: "40%", height: "30px" }}
                required
                value={this.state.destLocation}
                onChange={this.onInputChange}
              />
            </h6>
            <br />
            <h2>
              <button
                style={{
                  backgroundColor: "#39CCCC",
                  width: "150px",
                  height: "50px"
                }}
                onClick={this.callSearchTripApi}
              >
                Search
              </button>
            </h2>
          </div>
        </form>
        <Chatbot />
      </div>
    );
  }
}
