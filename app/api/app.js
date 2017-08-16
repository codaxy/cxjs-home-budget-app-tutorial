import config from "../../config/firebase";
import Firebase from "firebase/app";
import "firebase/auth";

const app = Firebase.initializeApp(config);
export const firebase = Firebase;
export const auth = firebase.auth();
