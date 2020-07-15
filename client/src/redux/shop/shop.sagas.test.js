import { takeLatest, put, call } from "redux-saga/effects";

import ShopActionTypes from "./shop.types";
import { fetchCollectionSuccess, fetchCollectionFailure } from "./shop.actions";
import {
  onFetchCollectionsStart,
  fetchCollectionsStartAsync
} from "./shop.sagas";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

describe("test shop sagas trigger functions", () => {
  it("test onFetchCollectionsStart function FETCH_COLLECTIONS_START action type", () => {
    const gen = onFetchCollectionsStart();

    expect(gen.next().value).toEqual(
      takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsStartAsync
      )
    );
  });
});

describe("test fetchCollectionsStartAsync", () => {
  const gen = fetchCollectionsStartAsync();

  it("should call firestore.collection", () => {
    const expectCollection = jest.spyOn(firestore, "collection");
    gen.next();

    expect(expectCollection).toHaveBeenCalled();
  });

  it("should call call(convertCollectionsSnapshotToMap, snapshot)", () => {
    const mockSnapshot = {};

    expect(gen.next(mockSnapshot).value).toEqual(
      call(convertCollectionsSnapshotToMap, mockSnapshot)
    );
  });

  it("should call put(fetchCollectionSuccess(collectionsMap))", () => {
    const mockCollectionsMap = {
      hats: {
        id: 1
      }
    };

    expect(gen.next(mockCollectionsMap).value).toEqual(
      put(fetchCollectionSuccess(mockCollectionsMap))
    );
  });

  it("should call put(fetchCollectionFailure()) on failure", () => {
    expect(gen.throw({ message: "errorName" }).value).toEqual(
      put(fetchCollectionFailure("errorName"))
    );
  });
});
