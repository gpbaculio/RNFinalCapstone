import {SET_USER} from './constants';

export type UserType = {
  firstName?: string;
  lastName?: string;
  image?: string | null;
  email?: string;
  phoneNumber?: string;
  emailStatuses?: boolean;
  passwordChanges?: boolean;
  specialOffers?: boolean;
  newsLetter?: boolean;
};

export type AuthenticationStateType = {
  user: UserType | null;
};

export type SetUserType = {
  type: typeof SET_USER;
  payload: {value: UserType | null};
};

export type AuthenticationActionTypes = SetUserType;
