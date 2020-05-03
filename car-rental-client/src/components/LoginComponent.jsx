import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import RentCarPage from "./RentCarPage";
import { Redirect } from "react-router-dom";

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Role: ""
    };
  }

  componentDidMount() {
    localStorage.setItem("Email", Auth.user.attributes.email);
  }

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
  theme: MyTheme,
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      {
        label: "Role(Driver or Rider)",
        key: "name",
        required: true,
        type: "string"
      },
      {
        label: "PhoneNumber",
        key: "custom:lastName",
        required: false,
        type: "string"
      }
    ]
  }
});
