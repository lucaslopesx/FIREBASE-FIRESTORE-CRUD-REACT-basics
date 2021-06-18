import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBRoiObf7VHglLt6DNaQgI5vyUMpzhCM8U",
    authDomain: "fb-crud-e6b33.firebaseapp.com",
    projectId: "fb-crud-e6b33",
    storageBucket: "fb-crud-e6b33.appspot.com",
    messagingSenderId: "617698841716",
    appId: "1:617698841716:web:c8f069de661e396b5bed21",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export const database = fire.firestore()
