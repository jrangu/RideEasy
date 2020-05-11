import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from "./AdminNavbar";
import config from "../../src/config";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import config from "../../src/config";

export default class RegisterLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      license: "",
      expiryDate: new Date(),
      filesSelected: {},
      showMaxSizeError: false,
      fileSubmitted: false,

    };
  }

  componentDidMount = () =>{
    var email = localStorage.getItem("Email");
    axios
      .get(config.BackendUrl+'getLicense/' + email)
      .then((response) => {
        console.log("checking" + JSON.stringify(response));
        console.log("date"+moment(response.data.expiryDate).format('MM/DD/YYYY')+" "+new Date(response.data.expiryDate));
        let date = moment(response.data.expiryDate).format('MM/DD/YYYY');
        this.setState({ 
          firstName: response.data.fullName,
          license : response.data.licenseNumber,
          expiryDate: new Date(response.data.expiryDate)
         })
      })
      .catch((error) => {
        console.log(error);
        alert("Server Error");
        this.setState({ 
          expiryDate: new Date()
         })
      });
  }

  handlefirstNameChange = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handlelastNameChange = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handlelicenseChange = (event) => {
    this.setState({
      license: event.target.value,
    });
  };

  handleexpiryChange = (date) => {
    this.setState({
      expiryDate: date,
    });
  };


  submitLicense = (event) => {
    event.preventDefault();

    var file = this.state.filesSelected;
    console.log("Uploading file to server");
    console.log(file.name);
    var size = file.size / 1024 / 1024; // 2MB Limit
    console.log("file size: " + size);

    if (size > 2) {
      this.setState(() => ({
        showMaxSizeError: true
      }));
    } else {
      var email = localStorage.getItem("Email");

      var formData = new FormData();
      formData.append("email", email);
      formData.append("file", file);
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("license", this.state.license);
      formData.append("expiryDate", this.state.expiryDate);

      const configure = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      console.log("result license before request ");

      axios
        .post(config.BackendUrl + "/uploadLC", formData, configure)
        .then(response1 => {
          console.log("result license" + response1.data);
          if (response1.data == "valid") {
            this.props.history.push({
              pathname: "/AddTrip"
            });
          }
          else {
            console.log("result license error ");
            alert("Oops.. Looks like you haven't uploaded a driver's license. Please upload again")
          }

        })
        .catch(error => {
          console.log("result license error " + error);

          alert("Please upload a valid DL Image");

        });
    }
  };


  fileDropped = e => {
    console.log("onFile onDropped" + e);
    var file = e.target.files[0];
    console.log("onFile onDropped image" + file);
    this.setState(() => ({
      filesSelected: file
    }));
  };

  render() {

    console.log("register license render :" + this.state.fileSubmitted);
    if (this.state.fileSubmitted) {
      console.log("file submitted redirec to rent a car page :");

      return <Redirect to="/SearchTrip" />;
    } else {
      return (
        <div>
          <AdminNavbar />
          <div style={{
            position: "absolute",
            left: "15%",
            top: "35%",
            width: "1000px",
            transform: "translate(-20%, -20%)",
          }}>
            <h3> Register your License here</h3>
            <Form>
              <Form.Row>
                <Form.Group controlId="licenseService">
                  <Form.Label>
                    <b>Upload License Image</b>
                  </Form.Label>
                  <br></br>
                  <div id="filesubmit">
                    <input
                      type="file"
                      className="file-select"
                      accept="image/*"
                      onChange={this.fileDropped}
                    />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="firstName">
                  <Form.Label>
                    <b>First Name</b>
                  </Form.Label>
                  <Form.Control
                    value={this.state.firstName}
                    onChange={this.handlefirstNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label>
                    <b>Last Name</b>
                  </Form.Label>
                  <Form.Control
                    value={this.state.lastName}
                    onChange={this.handlelastNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="license">
                  <Form.Label>
                    <b>License #</b>
                  </Form.Label>
                  <Form.Control
                    value={this.state.license}
                    onChange={this.handlelicenseChange}
                  />
                </Form.Group>

                <Form.Group controlId="expiryDate">
                  <Form.Label>
                    <b>Expiry Date</b>
                  </Form.Label>
                  <br></br>
                  <DatePicker
                    selected={this.state.expiryDate}
                    onChange={this.handleexpiryChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    minDate={subDays(new Date(), -1)}
                    placeholderText="Select Expiry date"
                  />
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type="submit"
                onClick={this.submitLicense}
              >
                Submit
          </Button>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Form>
          </div>
        </div>
      );
    }
  }


  componentDidMount() {
    console.log(
      "component did mount : " +
      localStorage.getItem("amplify-authenticator-authState")
    );

  }
}
