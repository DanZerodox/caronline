import firebase from 'firebase';

const config={
    apiKey: "AIzaSyChKl35DqItM7nxbUKT8tuXqSJj5hFTpVo",
    authDomain: "jumextienda.firebaseapp.com",
    databaseURL: "https://jumextienda.firebaseio.com",
    projectId: "jumextienda",
    storageBucket: "jumextienda.appspot.com",
    messagingSenderId: "1049411931781",
    appId: "1:1049411931781:web:1c019bc05a495f8a7163ec"
}

firebase.initializeApp(config);

export default firebase