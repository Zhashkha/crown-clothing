import UserActionTypes from "./user.types";
import * as actions from "./user.actions";

describe("test actions", () => {
  it("test googleSigninStart", () => {
    expect(actions.googleSigninStart().type).toBe(
      UserActionTypes.GOOGLE_SIGNIN_START
    );
  });

  it("test emailSigninStart", () => {
    const mockEmailAndPassword = {
      email: "email",
      password: "password"
    };

    expect(actions.emailSigninStart(mockEmailAndPassword).type).toBe(
      UserActionTypes.EMAIL_SIGNIN_START
    );

    expect(actions.emailSigninStart(mockEmailAndPassword).payload).toBe(
      mockEmailAndPassword
    );
  });

  it("test signinSuccess", () => {
    const mockUser = {
      uid: "123"
    };

    expect(actions.signinSuccess(mockUser).type).toBe(
      UserActionTypes.SIGNIN_SUCCESS
    );

    expect(actions.signinSuccess(mockUser).payload).toEqual(mockUser);
  });

  it("test signinFailure", () => {
    const mockError = {
      message: "text"
    };

    expect(actions.signinFailure(mockError).type).toBe(
      UserActionTypes.SIGNIN_FAILURE
    );

    expect(actions.signinFailure(mockError).payload).toEqual(mockError);
  });

  it("test checkUserSession", () => {
    expect(actions.checkUserSession().type).toBe(
      UserActionTypes.CHECK_USER_SESSION
    );
  });

  it("test signoutStart", () => {
    expect(actions.signoutStart().type).toBe(UserActionTypes.SIGNOUT_START);
  });

  it("test signoutSuccess", () => {
    expect(actions.signoutSuccess().type).toBe(UserActionTypes.SIGNOUT_SUCCESS);
  });

  it("test signoutFailure", () => {
    const mockError = {
      message: "text"
    };

    expect(actions.signoutFailure(mockError).type).toBe(
      UserActionTypes.SIGNOUT_FAILURE
    );

    expect(actions.signoutFailure(mockError).payload).toEqual(mockError);
  });

  it("test signupStart", () => {
    const mockUserCredentials = {
      userName: "userName",
      password: "password"
    };

    expect(actions.signupStart(mockUserCredentials).type).toBe(
      UserActionTypes.SIGNUP_START
    );

    expect(actions.signupStart(mockUserCredentials).payload).toEqual(
      mockUserCredentials
    );
  });

  it("test signupSuccess", () => {
    const mockData = {
      user: {
        uid: "123"
      },
      additionalData: {}
    };

    expect(actions.signupSuccess(mockData).type).toBe(
      UserActionTypes.SIGNUP_SUCCESS
    );

    expect(actions.signupSuccess(mockData).payload).toEqual(mockData);
  });

  it("test signupFailure", () => {
    const mockError = {
      message: "text"
    };

    expect(actions.signupFailure(mockError).type).toBe(
      UserActionTypes.SIGNUP_FAILURE
    );

    expect(actions.signupFailure(mockError).payload).toEqual(mockError);
  });

  it("test paymentSuccess", () => {
    expect(actions.paymentSuccess().type).toBe(UserActionTypes.PAYMENT_SUCCESS);
  });
});
