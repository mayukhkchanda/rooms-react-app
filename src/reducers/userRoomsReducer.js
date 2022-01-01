import { FETCHUSERROOMS, ADD_ROOM } from "../actions/types";

const INIT_STATE = {};

export const userRoomsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCHUSERROOMS:
      return action.payload;
    case ADD_ROOM:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
