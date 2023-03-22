import { SET_USER } from "./constants";
import { SetUserType, UserType } from "./types";

export const setUser = (value: UserType): SetUserType => ({
  type: SET_USER,
  payload: { value },
});
