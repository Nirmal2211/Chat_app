

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD66CigXKemrXA6-pTo4yQ1p9uyjqIqV-M",
    authDomain: "chat-room-9da05.firebase.com",
    databaseURL: "https://chat-room-9da05-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "chat-room-9da05",
    storageBucket: "chat-room-9da05.appspot.com",
    messagingSenderId: "21528469527",
    appId: "1:21528469527:android:49fb940f31244202e67c52"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
export { firebase, auth, database, firestore };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const database = firebase.database();

// export { auth, db };