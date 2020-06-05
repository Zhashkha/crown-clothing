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

export const getCartItems = async (userId) => {
  try {
    const cartsRef = firestore
      .collection(`carts`)
      .where("userId", "==", userId);
    const snapshot = await cartsRef.get();

    return snapshot.empty ? [] : snapshot.docs[0].data().items;
  } catch (error) {
    console.log("error getting cart items", error.message);
  }
};

export const updateCartItems = async (cartItems, userId) => {
  try {
    const cartsRef = firestore
      .collection(`carts`)
      .where("userId", "==", userId);
    const snapshot = await cartsRef.get();

    if (snapshot.empty) {
      const cartRef = firestore.collection(`carts`).doc();
      await cartRef.set({ userId, items: cartItems });
    } else {
      await snapshot.docs[0].ref.update({ items: cartItems });
    }
  } catch (error) {
    console.log("error updating cart items", error.message);
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default firebase;
