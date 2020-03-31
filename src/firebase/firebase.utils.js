import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBJfGwt-CJ_kPLykyrM5oGRzJrp6bZjZT0",
  authDomain: "crown-db-firebase.firebaseapp.com",
  databaseURL: "https://crown-db-firebase.firebaseio.com",
  projectId: "crown-db-firebase",
  storageBucket: "crown-db-firebase.appspot.com",
  messagingSenderId: "206149361771",
  appId: "1:206149361771:web:411703dc7370080d25112e",
  measurementId: "G-B0XJFWKBZZ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signinWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
