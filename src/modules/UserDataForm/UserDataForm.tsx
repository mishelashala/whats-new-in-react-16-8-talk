import React from "react";
import { IProfile } from "../../models";

interface IUserDataFormProps {
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onClickSave: (e: any) => void;
  data: IProfile;
  isSaving: boolean;
}

export const UserDataForm: React.SFC<IUserDataFormProps> = props => {
  return (
    <form className="row profile-form">
      <div className="columns small-12">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={props.onChangeFirstName}
          value={props.data.firstName}
        />
      </div>
      <div className="columns small-12">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={props.onChangeFirstName}
          value={props.data.lastName}
        />
      </div>
      <div className="columns small-12">
        <button
          type="button"
          className={
            props.isSaving ? "button expanded disabled" : "button expanded"
          }
          onClick={props.onClickSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};
