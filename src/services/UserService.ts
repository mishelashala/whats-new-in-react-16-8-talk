import { IProfile } from "../models";

// updateProfileData :: IProfile -> Promise<IProfile>
export const updateProfileData = (profile: IProfile): Promise<IProfile> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(profile);
    }, 1500);
  });
};

// getProfileData :: () -> Promise<IProfile>
export const getProfileData = (): Promise<IProfile> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        firstName: "John",
        lastName: "Doe"
      });
    }, 1500);
  });
};
