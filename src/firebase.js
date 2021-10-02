//Import the function to configure and initalize our firebase app.
import { initializeApp } from "firebase/app";

//import the function to pull in the Firebase realtime database service:
import { getDatabase } from 'firebase/database';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const firebaseConfig = {
  apiKey: "AIzaSyDMdU-Ta8MrR2e5UR4wYA2vyQIru7Xrbkk",
  authDomain: "project3-tasklist.firebaseapp.com",
  databaseURL: "https://project3-tasklist-default-rtdb.firebaseio.com",
  projectId: "project3-tasklist",
  storageBucket: "project3-tasklist.appspot.com",
  messagingSenderId: "540604569804",
  appId: "1:540604569804:web:d1dab378ddb71c6b4c0a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//go get the realtime database service:
const realtime = getDatabase(app);

export default realtime;