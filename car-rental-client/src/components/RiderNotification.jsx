import React, { Component } from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import { Checkbox } from 'antd';
import axios from "axios";
import config from "../../src/config";

export default class RiderNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }

    handleCheckboxChange = event => {
        this.setState({
            status: event.target.checked
        });
    };

    componentDidMount() {
        console.log(localStorage.getItem("Email"));
        console.log("check status" + this.state.status);
    }

    callRegisterApi = event => {
        event.preventDefault();
        var registerData = new FormData();
        registerData.append("isRegister", this.state.status);
        registerData.append("email", localStorage.getItem("Email"));
        axios
            .put(config.BackendUrl + "registerForSMS", registerData)
            .then(function (response) {
                console.log("response", response);
                alert(response.data);
            })
            .catch(function (error) {
                console.log("Error " + JSON.stringify(error));
                //alert("Error");
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
                            left: "5%",
                            top: "20%",
                        }}
                    >
                        <br />
                        <h4 style={{ font: " serif" }}>Register for SMS Notifications</h4>
                        <br />
                        <Checkbox style={{ fontSize: "20px" }} onChange={this.handleCheckboxChange}>
                            Select the checkbox and confirm to get SMS notifications for your bookings
                        </Checkbox>
                        <br />
                        <br />
                        <h4>
                            <button

                                style={{
                                    backgroundColor: "#07a4ffc4",
                                    width: "150px",
                                    height: "50px"
                                  }}
                                onClick={this.callRegisterApi}
                            >
                                Confirm
              </button>
                        </h4>
                    </div>
                </form>
                <Chatbot />
            </div>
        );
    }
}
