import ShopActionTypes from "./shop.types";
import {
  fetchCollectionsStart,
  fetchCollectionsStartAsync,
  fetchCollectionSuccess,
  fetchCollectionFailure
} from "./shop.actions";

describe("test actions", () => {
  it("test fetchCollectionsStart", () => {
    expect(fetchCollectionsStart().type).toBe(
      ShopActionTypes.FETCH_COLLECTIONS_START
    );
  });

  it("test fetchCollectionsStartAsync", () => {
    const mockAction = fetchCollectionsStartAsync();
    const dispatch = jest.fn();

    mockAction(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchCollectionsStart());
  });

  it("test fetchCollectionSuccess", () => {
    const mockCollectionsMap = { hats: { id: 1 } };
    const action = fetchCollectionSuccess(mockCollectionsMap);

    expect(action.type).toBe(ShopActionTypes.FETCH_COLLECTIONS_SUCCESS);
    expect(action.payload).toBe(mockCollectionsMap);
  });

  it("test fetchCollectionFailure", () => {
    const mockError = "errorMessage";
    const action = fetchCollectionFailure(mockError);

    expect(action.type).toBe(ShopActionTypes.FETCH_COLLECTIONS_FAILURE);
    expect(action.payload).toBe(mockError);
  });
});
