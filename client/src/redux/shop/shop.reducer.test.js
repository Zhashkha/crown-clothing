import ShopActionTypes from "./shop.types";
import shopReducer from "./shop.reducer";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

describe("test shop reducer", () => {
  it("test initial state", () => {
    expect(shopReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("test FETCH_COLLECTIONS_START action type", () => {
    expect(
      shopReducer(INITIAL_STATE, {
        type: ShopActionTypes.FETCH_COLLECTIONS_START
      }).isFetching
    ).toBe(true);
  });

  it("test FETCH_COLLECTIONS_SUCCESS action type", () => {
    const mockCollections = [{ id: 1 }, { id: 2 }];

    expect(
      shopReducer(INITIAL_STATE, {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: mockCollections
      })
    ).toEqual({
      ...INITIAL_STATE,
      isFetching: false,
      collections: mockCollections
    });
  });

  it("test FETCH_COLLECTIONS_FAILURE action type", () => {
    const mockError = "errorMessage";

    expect(
      shopReducer(INITIAL_STATE, {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: mockError
      })
    ).toEqual({
      ...INITIAL_STATE,
      isFetching: false,
      errorMessage: mockError
    });
  });
});
