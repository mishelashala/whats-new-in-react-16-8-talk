import React from "react";
import { UserServiceContext } from "../../providers";
import { If } from "../../modules";

const noop = () => {};

interface IUserState {
  data: {
    firstName: string;
    lastName: string;
  };
}

const userState = (): IUserState => ({
  data: {
    firstName: "",
    lastName: ""
  }
});

const user = (state: IUserState = userState(), action: any): IUserState => {
  switch (action.type) {
    case "my-app/USER_FORM/UPDATE_FIRST_NAME":
      return {
        ...state,
        data: {
          ...state.data,
          firstName: action.payload.firstName
        }
      };

    case "my-app/USER_FORM/UPDATE_LAST_NAME":
      return {
        ...state,
        data: {
          ...state.data,
          lastName: action.payload.lastName
        }
      };

    case "my-app/USER_FORM/LOAD_DATA":
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};

export const UserDataForm: React.FC = () => {
  const userService = React.useContext(UserServiceContext);

  const [state, dispatch] = React.useReducer(user, userState());

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving] = React.useState(false);

  React.useEffect(() => {
    userService.getProfileData().then(data => {
      dispatch({
        type: "my-app/USER_FORM/LOAD_DATA",
        payload: data
      });
      setIsLoading(false);
    });
  });

  return (
    <React.Fragment>
      <If predicate={isLoading}>
        <p className="profile-loading">Loading</p>
      </If>

      <If predicate={!isLoading}>
        <form className="row profile-form">
          <div className="columns small-12">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={({ target: { value } }) =>
                dispatch({
                  type: "my-app/USER_FORM/UPDATE_FIRST_NAME",
                  payload: { firstName: value }
                })
              }
              value={state.data.firstName}
              disabled={isSaving}
            />
          </div>
          <div className="columns small-12">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={({ target: { value } }) =>
                dispatch({
                  type: "my-app/USER_FORM/UPDATE_LAST_NAME",
                  payload: { lastName: value }
                })
              }
              value={state.data.lastName}
              disabled={isSaving}
            />
          </div>
          <div className="columns small-12">
            <button
              type="button"
              className={
                isSaving ? "button expanded disabled" : "button expanded"
              }
              onClick={noop}
            >
              Save
            </button>
          </div>
        </form>
      </If>
    </React.Fragment>
  );
};
