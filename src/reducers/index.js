import { combineReducers } from "redux";
import { roomReducer } from "./RoomsReducer";
import { authReducer } from "./AuthReducer";
import { signedInReducer } from "./SignedInReducer";
import { userRoomsReducer } from "./userRoomsReducer";

const rootReducer = combineReducers({
  rooms: roomReducer,
  user: authReducer,
  isSignedIn: signedInReducer,
  userRooms: userRoomsReducer,
});

export default rootReducer;
