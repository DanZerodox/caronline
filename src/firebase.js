import firebase from 'firebase';

const config={
    apiKey: "AIzaSyCcK65Bk7mEmuSwVIxn6oP4_rQaBOhudLQ",
    authDomain: "my-app-3ad9d.firebaseapp.com",
    databaseURL: "https://my-app-3ad9d.firebaseio.com",
    projectId: "my-app-3ad9d",
    storageBucket: "my-app-3ad9d.appspot.com",
    messagingSenderId: "644122214041",
    appId: "1:644122214041:web:ab9e23da84ee09e6740208"
}

firebase.initializeApp(config);

export default firebase