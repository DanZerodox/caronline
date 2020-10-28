importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js')

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     }).catch(function(err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// }
firebase.initializeApp({
  apiKey: "AIzaSyCcK65Bk7mEmuSwVIxn6oP4_rQaBOhudLQ",
  authDomain: "my-app-3ad9d.firebaseapp.com",
  databaseURL: "https://my-app-3ad9d.firebaseio.com",
  projectId: "my-app-3ad9d",
  storageBucket: "my-app-3ad9d.appspot.com",
  messagingSenderId: "644122214041",
  appId: "1:644122214041:web:ab9e23da84ee09e6740208"
})

const initMessaging = firebase.messaging()

