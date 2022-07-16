import firebase from "firebase";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const authenticator = firebase.auth();

export { db, authenticator };
