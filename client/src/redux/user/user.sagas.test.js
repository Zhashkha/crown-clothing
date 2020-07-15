import { takeLatest, put, call } from "redux-saga/effects";

import UserTypes from "./user.types";
import {
  signinFailure,
  signoutSuccess,
  signoutFailure,
  signupFailure
} from "./user.actions";
import {
  onCheckUserSession,
  onEmailSigninStart,
  onGoogleSigninStart,
  onSignoutStart,
  onSignupStart,
  onSignupSuccess,
  isUserAuthenticated,
  signinWithEmail,
  signinWithGoogle,
  signout,
  signup,
  signinAfterSignup,
  getSnapshotFromUserAuth
} from "./user.sagas";
import {
  createUserProfileDocument,
  googleProvider,
  auth,
  getCurrentUser
} from "../../firebase/firebase.utils";

describe("test user sagas trigger actions", () => {
  it("test onCheckUserSession action with type CHECK_USER_SESSION", () => {
    const gen = onCheckUserSession();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
  });

  it("test onEmailSigninStart action with type EMAIL_SIGNIN_START", () => {
    const gen = onEmailSigninStart();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.EMAIL_SIGNIN_START, signinWithEmail)
    );
  });

  it("test onGoogleSigninStart action with type GOOGLE_SIGNIN_START", () => {
    const gen = onGoogleSigninStart();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
    );
  });

  it("test onSignoutStart action with type SIGNOUT_START", () => {
    const gen = onSignoutStart();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.SIGNOUT_START, signout)
    );
  });

  it("test onSignupStart action with type SIGNUP_START", () => {
    const gen = onSignupStart();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.SIGNUP_START, signup)
    );
  });

  it("test onSignupSuccess action with type SIGNUP_SUCCESS", () => {
    const gen = onSignupSuccess();

    expect(gen.next().value).toEqual(
      takeLatest(UserTypes.SIGNUP_SUCCESS, signinAfterSignup)
    );
  });
});

describe("test getSnapshotFromUserAuth", () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const gen = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);

  it("should call createUserProfileDocument", () => {
    expect(gen.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
    );
  });

  it("should call put(signinFailure(error)) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signinFailure("errorName"))
    );
  });
});

describe("test signinWithGoogle", () => {
  const gen = signinWithGoogle();

  it("should call auth.signInWithPopup", () => {
    expect(gen.next().value).toEqual(auth.signInWithPopup(googleProvider));
  });

  it("should call put(signinFailure(error) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signinFailure("errorName"))
    );
  });
});

describe("test signinWithEmail", () => {
  const mockEmail = "";
  const mockPassword = "";
  const mockPayload = { payload: { email: mockEmail, password: mockPassword } };
  const gen = signinWithEmail(mockPayload);

  it("should call auth.signInWithEmailAndPassword", () => {
    expect(gen.next().value).toEqual(
      auth.signInWithEmailAndPassword(mockEmail, mockPassword)
    );
  });

  it("should call put(signinFailure(error)) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signinFailure("errorName"))
    );
  });
});

describe("test isUserAuthenticated", () => {
  const gen = isUserAuthenticated();

  it("should call getCurrentUser", () => {
    expect(gen.next().value).toEqual(getCurrentUser());
  });

  it("should call getSnapshotFromUserAuth(userAuth)", () => {
    const mockUserAuth = { uid: "123zx" };

    expect(gen.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });

  it("should call put(signinFailure(error)) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signinFailure("errorName"))
    );
  });
});

describe("test signout", () => {
  const gen = signout();

  it("should call auth.signOut()", () => {
    const expectSignout = jest.spyOn(auth, "signOut");
    gen.next();

    expect(expectSignout).toHaveBeenCalled();
  });

  it("should call put(signoutSuccess()) on success", () => {
    expect(gen.next().value).toEqual(put(signoutSuccess()));
  });

  it("should call put(signoutFailure(error)) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signoutFailure("errorName"))
    );
  });
});

describe("test signup", () => {
  const mockEmail = "";
  const mockPassword = "";
  const mockDisplayName = "";
  const mockPayload = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName
    }
  };
  const gen = signup(mockPayload);

  it("should call auth.createUserWithEmailAndPassword(email, password)", () => {
    const expectedCreateUserWithEmailAndPassword = jest.spyOn(
      auth,
      "createUserWithEmailAndPassword"
    );
    gen.next();

    expect(expectedCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it("should call put(signupFailure(error)) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(signupFailure("errorName"))
    );
  });
});
