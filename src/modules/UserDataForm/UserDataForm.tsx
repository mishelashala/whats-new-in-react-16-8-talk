import React from "react";
import { IProfile, IUserService } from "../../models";
import { If } from "../../modules";

interface IUserDataFormProps {
  userService: IUserService;
}

interface IUserDataFormState {
  data: IProfile;
  isSaving: boolean;
  isLoading: boolean;
}

export class UserDataForm extends React.Component<
  IUserDataFormProps,
  IUserDataFormState
> {
  state = {
    data: {
      firstName: "",
      lastName: ""
    },
    isSaving: false,
    isLoading: true
  };

  async componentDidMount() {
    const data = await this.props.userService.getProfileData();
    this.setState({
      data,
      isLoading: false
    });
  }

  handleChangeFirstName = ({ target: { value } }: any): void => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        firstName: value
      }
    }));
  };

  handleChangeLastName = ({ target: { value } }: any): void => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
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

    const data = await this.props.userService.updateProfileData(
      this.state.data
    );

    this.setState(prevState => ({
      ...prevState,
      isSaving: false,
      data
    }));
  };

  render() {
    return (
      <React.Fragment>
        <If predicate={this.state.isLoading}>
          <p className="profile-loading">Loading</p>
        </If>

        <If predicate={!this.state.isLoading}>
          <form className="row profile-form">
            <div className="columns small-12">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChangeFirstName}
                value={this.state.data.firstName}
                disabled={this.state.isSaving}
              />
            </div>
            <div className="columns small-12">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={this.handleChangeLastName}
                value={this.state.data.lastName}
                disabled={this.state.isSaving}
              />
            </div>
            <div className="columns small-12">
              <button
                type="button"
                className={
                  this.state.isSaving
                    ? "button expanded disabled"
                    : "button expanded"
                }
                onClick={this.handleClickSave}
              >
                Save
              </button>
            </div>
          </form>
        </If>
      </React.Fragment>
    );
  }
}
