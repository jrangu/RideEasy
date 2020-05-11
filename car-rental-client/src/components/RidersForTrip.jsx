import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Navbar from "./AdminNavbar"
import config from "../../src/config";



export default class RidersForTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
        riders: [],
        id: "",
        RiderName: "",
        email: "",
        phoneNumber: "",
      ridersList: JSON.parse((this.props.location.state.riderDetails))

    };
  }
  componentDidMount() {
 console.log("details from driverTriplist page" + JSON.stringify(this.state.ridersList)); //uncomment to check the trip details

    this.loadRidersForTrip();
  }
  loadRidersForTrip = () => {
    var email = localStorage.getItem("Email");
    console.log("inside license get" + email);
    console.log("trip id ", this.state.ridersList.id)
    axios
      .get(config.BackendUrl + "ridersForTrip?email=" + email + "&trip_id=" + this.state.ridersList.id)
      .then(res => {
        console.log("response list", res);
        return res;
      })
      .then(result => {
        console.log("res", result.data);
        if (result.data) {
          this.setState({ riders: result.data });
        }
      })
   .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (

      <div>
        <Navbar name={this.state.username} />
        <br></br>
        <h3 align="center">Riders List For this Trip</h3>
        <br />
        <br />
        <Table striped bordered hover size="xl">
          <thead class="table table-striped">
            <tr>
              <th># Rider Id</th>
              <th>Name of the Rider</th>
              <th>Rider Email</th>
              <th>Rider Contact number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.riders.map(riders => {
              return (
                <tr>
                  <td>{riders.id}</td>
                  <td>{riders.userName}</td>
                  <td>{riders.email}</td>
                  <td>{riders.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>

        </Table>
      </div>

    );
  }
}

