import {
  GET_ROOMS,
  ADD_ROOM,
  SIGNIN,
  SIGNOUT,
  FETCHUSERROOMS,
  ADDUSERTOROOM,
} from "./types";
import { db } from "../firebase";
import firebase from "firebase/app";
import history from "../history";

//----------- GET ALL ROOMS -----------//
export const getRooms = () => async (dispatch, getState) => {
  const roomsList = await db
    .collection("rooms")
    .get()
    .then((querySnapshot) => {
      const list = {};
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          list[doc.id] = {
            id: doc.id,
            ...doc.data(),
          };
        });
      }
      //else doc.data() will be undefined in this case
      return list;
    })
    .catch((err) => console.log(err));

  dispatch({
    type: GET_ROOMS,
    payload: roomsList,
  });
};

//----------- ADD A ROOM ------------//
export const addRoom = (roomName) => async (dispatch, getState) => {
  const user = getState().user;

  const roomObj = {
    roomName,
    createdBy: user.name,
    messages: [],
    users: [user.id],
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const room = db
    .collection("rooms")
    .add(roomObj)
    .then(async (docRef) => {
      // Fetch newly added room's data
      const docData = await db
        .collection("rooms")
        .doc(docRef.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return { ...doc.data(), id: docRef.id };
          } else {
            return null;
          }
        })
        .catch((error) => console.log("Error getting document:", error));

      return docData;
    })
    .catch((error) => console.log("Error getting document:", error));

  // room is a promise
  room
    .then((value) => {
      dispatch({
        type: ADD_ROOM,
        payload: value,
      });

      //navigate to this room
      history.push(`/rooms/${value["id"]}`);
    })
    .catch((error) => {
      console.log("An Error Occured. " + error);
    });
};

//----------- SIGN-IN A USER ------------//
export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user,
  };
};

//----------- SIGN-OUT A USER ------------//
export const signOut = () => {
  return {
    type: SIGNOUT,
    payload: null,
  };
};

//----------- FETCH ALL ROOMS WHERE USER EXISTS ------------//
export const fetchUserRooms = (user) => async (dispatch, getState) => {
  const userRooms = await db
    .collection("rooms")
    .where("users", "array-contains", user.id)
    .get()
    .then((querySnapshot) => {
      let data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = { ...doc.data(), id: doc.id };
      });
      return data;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  dispatch({
    type: FETCHUSERROOMS,
    payload: userRooms,
  });
};

//----------- ADD USER TO A ROOM ------------//
export const addUserToRoom = (roomId) => async (dispatch, getState) => {
  const uid = getState().user.id;

  const roomData = await db
    .collection("rooms")
    .doc(roomId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(uid),
    })
    .then(async () => {
      const data = await db
        .collection("rooms")
        .doc(roomId)
        .get()
        .then((doc) => {
          let data = {};

          if (doc.exists) {
            data = { id: doc.id, ...doc.data() };
          }
          return data;
        });

      return data;
    })
    .catch((err) => console.log(err));

  dispatch({
    type: ADDUSERTOROOM,
    payload: roomData,
  });
};

//----------- POST MESSAGE ------------//
export const postMessage = (roomId, message) => async (dispatch, getState) => {
  db.collection("rooms")
    .doc(roomId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
};

//----------- FETCH USER'S DATA FROM IDs ------------//
// export const fetchUsersDataFromIds =
//   (userIds) => async (dispatch, getState) => {
//     const data = await db
//       .collection("users")
//       .doc(roomId)
//       .where("country", "in", ["USA", "Japan"]);
//     console.log(data);
//   };

//----------- ADD USER DATA AFTER SIGN UP ------------//
export const addUserData = (user) => {
  db.collection("users").add(user);
};
