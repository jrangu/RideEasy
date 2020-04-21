import React, { Component } from "react";
import Navbar from "./Navbar";

export default class TripList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripListResponse: []
        };
    }
    componentDidMount() {
        this.callGetApi();
    }

    callGetApi = async () => {
        console.log("inside rental location get")
        let URL = "http://localhost:8080/getTrips";
        fetch(URL)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tripListResponse: response
                });
                console.log("List" + JSON.stringify(this.state.tripListResponse));
            })
            .catch(error => {
                console.log("Error" + error);
            });
        console.log("After Fetch");
    };

    render() {
        return (
            <div>
                <Navbar name={this.state.username} />
                <h2>List of Trips</h2>
            </div>
        );
    }
}
