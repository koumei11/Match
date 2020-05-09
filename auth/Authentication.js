import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAhR37O_uO_Zl_uLaOPn6C9k6Au6rs52Hs",
  authDomain: "match-7024d.firebaseapp.com",
  databaseURL: "https://match-7024d.firebaseio.com",
  projectId: "match-7024d",
  storageBucket: "match-7024d.appspot.com",
  messagingSenderId: "177596306183",
  appId: "1:177596306183:web:f54afb88e85c1227d06ba2",
  measurementId: "G-964MNZMF09",
};

firebase.initializeApp(firebaseConfig);

export const signup = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      if (user) {
        return user;
      }
    });
};
