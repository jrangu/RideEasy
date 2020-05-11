import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import RentCarPage from "./RentCarPage";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../src/config";

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Role: ""
    };
  }

  componentDidMount() {
    localStorage.setItem("Email", Auth.user.attributes.email);
    this.checkUser();
  }

  checkUser = () => {
    axios
      .get(
        config.BackendUrl +
          "getUser" +
          "/" +
          Auth.user.attributes.email +
          "/" +
          Auth.user.attributes.name
      )
      .then(res => {
        if (!res.data) {
          this.addUser();
        }
      })
      .catch(error => {
        alert(error);
        console.log("error observed !!!" + error);
      });
  };

  addUser = () => {
    let formdata = new FormData();
    formdata.append("email", Auth.user.attributes.email);
    formdata.append("role", Auth.user.attributes.name);
    formdata.append("userName", Auth.user.username);
    formdata.append("phoneNumber", Auth.user.attributes.phone_number);

    axios
      .post(config.BackendUrl + `/addUser`, formdata)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("error observed !!!" + error);
      });
  };

  render() {
    if (Auth.user.attributes.name == "Rider") {
      return <Redirect to="/SearchTrip" />;
    } else {
      return <Redirect to="/AddTrip" />;
    }
  }
}
const MyTheme = {
  button: { backgroundColor: "blue" },
  a: { color: "blue" },
  signInButtonIcon: { display: "none" }
};

export default withAuthenticator(LoginComponent, {
  includeGreetings: false,
  authenticatorComponents: [],
  bypassCache: true,
  theme: MyTheme,
  signUpConfig: {
    signUpFields: [
      {
        label: "Role(Driver or Rider)",
        key: "name",
        required: true,
        type: "string"
      }
    ]
  }
});
