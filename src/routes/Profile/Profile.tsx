import React from "react";
import { IProfile, IUserService } from "../../models";
import { Navigation, UserDataForm } from "../../modules";
import { UserServiceContext } from "../../providers";
import "./profile.css";

export interface IProfileProps {
  userService: IUserService;
}

export interface IProfileState {
  isLoading: boolean;
  isSaving: boolean;
  profile: IProfile;
}

export class Profile extends React.Component<IProfileProps, IProfileState> {
  static contextType = UserServiceContext;

  render() {
    return (
      <div>
        <Navigation title="Profile" />
        <UserServiceContext.Consumer>
          {userService => <UserDataForm userService={userService} />}
        </UserServiceContext.Consumer>
      </div>
    );
  }
}
