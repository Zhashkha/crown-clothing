import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsStartAsync = () => {
  // let unsubscribeFromSnapshot = null;
  return (dispatch) => {
    dispatch(fetchCollectionsStart());
    const collectionRef = firestore.collection("collections");

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
    // if (!unsubscribeFromSnapshot) {
    //   unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionSuccess(collectionsMap));
    //   });
    // }
  };
};

export const fetchCollectionSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});
