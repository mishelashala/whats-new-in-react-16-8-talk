import React from "react";
import { Navigation, UserDataForm } from "../../modules";
import { UserServiceContext } from "../../providers";
import "./profile.css";

export class Profile extends React.Component<{}> {
  static contextType = UserServiceContext;

  render() {
    return (
      <div>
        <Navigation title="Profile" />
        <UserDataForm />
      </div>
    );
  }
}
