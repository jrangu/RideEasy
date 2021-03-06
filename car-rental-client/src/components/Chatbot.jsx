import React, { Component } from "react";
import axios from "axios";
import { Widget, addResponseMessage, dropMessages } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import config from "../../src/config";

export default class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      message: ""
    };
  }

  componentDidMount() {
    dropMessages();
    addResponseMessage("Hi! How can I help you today?");
  }
  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API

    // axios
    //   .post(config.BackendUrl + "/chatbot/" + newMessage)
    //   .then(res => {

    var message = new FormData();
    message.append("message", newMessage);

    axios
      .post("https://2zs6m2ajt7.execute-api.us-east-1.amazonaws.com/stage/chatbot", {
        "message": newMessage
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("Response  - " + res.data.body);
        this.state.message = res.data.body;
        if (this.state.message === "") {
          addResponseMessage("Chat bot services are currently not avaialable");
        } else if (this.state.message === "EnterUserName") {
          this.handleNewUserMessage(localStorage.getItem("userName"));
        } else {
          addResponseMessage(this.state.message);
        }
      })
      .catch(error => {
        console.log(error);
        addResponseMessage("Chat bot services are currently not avaialable");
      });
  };

  render() {
    return (
      <div>
        <Widget
          title="Ride-Easy"
          subtitle="ChatBot"
          senderPlaceHolder="Type a message..."
          background-color="blue"
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}
