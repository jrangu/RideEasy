import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Navbar from "./AdminNavbar"



export default class RidersForDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riders: [],
      id: "",
      RiderName: "",
      email: "",
      phoneNumber: "",
     

    };
  }
  componentDidMount() {

 this.loadRidersForDriver();
  }
  loadRidersForDriver= () => {
    var email = localStorage.getItem("Email");
    console.log("inside license get" + email);
    axios
      .get("http://localhost:8080/" + "ridersList?email=" + email)
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

