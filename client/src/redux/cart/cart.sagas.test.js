import { takeLatest, select, put } from "redux-saga/effects";

import CartActionTypes from "./cart.types";
import UserActionTypes from "../user/user.types";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { fetchItemsOnSigninFailure, clearCart } from "./cart.actions";
import {
  onCartChange,
  onSigninSuccess,
  onSignoutSuccess,
  onPaymentSuccess,
  updateItemsInCart,
  getCartItemsOnSignin,
  clearCartOnSignout,
  clearCartOnPayment
} from "./cart.sagas";

describe("test cart sagas trigger functions", () => {
  it("test onCartChange function on ADD_ITEM, REMOVE_ITEM and CLEAR_ITEM_FROM_CART action types", () => {
    const gen = onCartChange();

    expect(gen.next().value).toEqual(
      takeLatest(
        [
          CartActionTypes.ADD_ITEM,
          CartActionTypes.REMOVE_ITEM,
          CartActionTypes.CLEAR_ITEM_FROM_CART
        ],
        updateItemsInCart
      )
    );
  });

  it("test onSigninSuccess function with SIGNIN_SUCCESS action type", () => {
    const gen = onSigninSuccess();

    expect(gen.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNIN_SUCCESS, getCartItemsOnSignin)
    );
  });

  it("test onSignoutSuccess function with SIGNOUT_SUCCESS action type", () => {
    const gen = onSignoutSuccess();

    expect(gen.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout)
    );
  });

  it("test onPaymentSuccess function with PAYMENT_SUCCESS action type", () => {
    const gen = onPaymentSuccess();

    expect(gen.next().value).toEqual(
      takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearCartOnPayment)
    );
  });
});

describe("test updateItemsInCart", () => {
  it("should select selectCurrentUser", () => {
    const gen = updateItemsInCart();

    expect(gen.next().value).toEqual(select(selectCurrentUser));
  });
});

describe("test getCartItemsOnSignin", () => {
  const mockPayload = { payload: {} };
  const gen = getCartItemsOnSignin(mockPayload);

  it("should select selectCartItems", () => {
    expect(gen.next().value).toEqual(select(selectCartItems));
  });

  it("should call put(fetchItemsOnSigninFailure()) on failure", () => {
    expect(gen.throw("errorName").value).toEqual(
      put(fetchItemsOnSigninFailure())
    );
  });
});

describe("test clearCartOnSignout", () => {
  it("should call put(clearCart())", () => {
    const gen = clearCartOnSignout();

    expect(gen.next().value).toEqual(put(clearCart()));
  });
});

describe("test clearCartOnPayment", () => {
  it("should call put(clearCart())", () => {
    const gen = clearCartOnPayment();

    expect(gen.next().value).toEqual(put(clearCart()));
  });
});
