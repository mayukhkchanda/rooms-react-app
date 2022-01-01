import { GET_ROOMS, ADD_ROOM, SIGNOUT } from "../actions/types";

const INIT_STATE = {};

export const roomReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROOMS:
      return action.payload;
    case ADD_ROOM:
      return { ...state, [action.payload.id]: action.payload };
    case SIGNOUT:
      return INIT_STATE;
    default:
      return state;
  }
};
