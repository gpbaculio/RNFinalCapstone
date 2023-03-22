import { AuthenticationActionTypes, AuthenticationStateType } from "./types";
import { SET_USER } from "./constants";

const initialState: AuthenticationStateType = {
  user: null,
};

const reducer = (
  state = initialState,
  action: AuthenticationActionTypes
): AuthenticationStateType => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
