import firebase from "firebase";

export const inicializarFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyCcK65Bk7mEmuSwVIxn6oP4_rQaBOhudLQ",
        authDomain: "my-app-3ad9d.firebaseapp.com",
        databaseURL: "https://my-app-3ad9d.firebaseio.com",
        projectId: "my-app-3ad9d",
        storageBucket: "my-app-3ad9d.appspot.com",
        messagingSenderId: "644122214041",
        appId: "1:644122214041:web:ab9e23da84ee09e6740208"
    });
};

export const preguntarPermisos = async () => {
    try {
        const messaging = firebase.messaging();

        //await messaging.requestPermission();
        await Notification.requestPermission().then(async permission => {
            if (permission === "denied") {
                console.log("Permission wasn't granted. Allow a retry.");
                return;
            } else if (permission === "default") {
                console.log("The permission request was dismissed.");
                return;
            }
            const token = await messaging.getToken();
            console.log("user token: ", token);

            return token;
        });
    } catch (error) {
        console.error(error);
    }
};