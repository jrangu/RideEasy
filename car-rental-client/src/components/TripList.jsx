import React, { Component } from "react";
import Navbar from "./Navbar";

export default class TripList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    
    componentDidMount(){
        console.log("check prev form"+this.props.location.state.data);
    } 

    render() {
        return (
            <div>
                <Navbar />
                <h2>List of Trips</h2>
            </div>
        );
    }
}
