export interface IProfile {
  firstName: string;
  lastName: string;
}

export interface IUserService {
  updateProfileData: (profile: IProfile) => Promise<IProfile>;
  getProfileData: () => Promise<IProfile>;
}
