import React from "react";
import { IProfile, IUserService } from "../../models";
import { If, Navigation, UserDataForm } from "../../modules";
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
  state = {
    isLoading: true,
    isSaving: false,
    profile: {
      firstName: "",
      lastName: ""
    }
  };

  static contextType = UserServiceContext;

  async componentDidMount() {
    const profile = await this.props.userService.getProfileData();
    this.setState({
      isLoading: false,
      profile
    });
  }

  handleFirstNameChange = ({ target: { value } }: any): void => {
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        firstName: value
      }
    }));
  };

  handleLastNameChange = ({ target: { value } }: any): void => {
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        lastName: value
      }
    }));
  };

  handleClickSave = async () => {
    if (this.state.isSaving) {
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      isSaving: true
    }));

    const profile = await this.props.userService.updateProfileData(
      this.state.profile
    );

    this.setState(prevState => ({
      ...prevState,
      isSaving: false,
      profile
    }));
  };

  render() {
    return (
      <div>
        <Navigation title="Profile" />

        <If predicate={this.state.isLoading}>
          <p className="profile-loading">Loading</p>
        </If>

        <If predicate={!this.state.isLoading}>
          <UserDataForm
            data={this.state.profile}
            isSaving={this.state.isSaving}
            onChangeFirstName={this.handleFirstNameChange}
            onChangeLastName={this.handleLastNameChange}
            onClickSave={this.handleClickSave}
          />
        </If>
      </div>
    );
  }
}
