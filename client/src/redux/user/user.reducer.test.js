import UserActionTypes from "./user.types";
import userReducer from "./user.reducer";

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

describe("test userReducer", () => {
  it("test user reducer initial state", () => {
    expect(userReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("test SIGNIN_SUCCESS type action", () => {
    const mockUser = { uid: "123" };

    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionTypes.SIGNIN_SUCCESS,
        payload: mockUser
      }).currentUser
    ).toEqual(mockUser);
  });

  it("test SIGNOUT_SUCCESS type action", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionTypes.SIGNOUT_SUCCESS
      }).currentUser
    ).toBe(null);
  });

  it("test SIGNIN_FAILURE, SIGNOUT_FAILURE, SIGNUP_FAILURE type actions", () => {
    const mockError = {
      message: "text"
    };

    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionTypes.SIGNIN_FAILURE,
        payload: mockError
      }).error
    ).toEqual(mockError);

    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionTypes.SIGNUP_FAILURE,
        payload: mockError
      }).error
    ).toEqual(mockError);

    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionTypes.SIGNOUT_FAILURE,
        payload: mockError
      }).error
    ).toEqual(mockError);
  });
});
