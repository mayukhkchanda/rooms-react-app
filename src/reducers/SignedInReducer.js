import { SIGNIN, SIGNOUT } from "../actions/types";

const INIT_STATE = false;

export const signedInReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN:
      return true;

    case SIGNOUT:
      return false;
    default:
      return state;
  }
};
