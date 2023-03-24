import {SET_USER} from './constants';
import {SetUserType, UserType} from './types';

export const setUser = (value: UserType | null): SetUserType => ({
  type: SET_USER,
  payload: {value},
});
