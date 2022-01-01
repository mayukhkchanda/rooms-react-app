import { SIGNIN, SIGNOUT } from "../actions/types";

const INIT_STATE = {};

export const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN:
      return action.payload;

    case SIGNOUT:
      return INIT_STATE;
    default:
      return state;
  }
};
