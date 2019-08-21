import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAHvVhBgt6xdv9KywN3N2K7sWV2AgXzy5A",
    authDomain: "weldi-reactnative.firebaseapp.com",
    databaseURL: "https://weldi-reactnative.firebaseio.com",
    projectId: "weldi-reactnative",
    storageBucket: "",
    messagingSenderId: "623602451980",
    appId: "1:623602451980:web:916fbaf2af2d5896"
  };

  export default Fire = firebase.initializeApp(firebaseConfig);