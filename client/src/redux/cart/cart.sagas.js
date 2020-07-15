import { takeLatest, put, all, call, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";
import CartActionTypes from "./cart.types";
import { selectCartItems } from "./cart.selectors";
import {
  clearCart,
  fetchItemsOnSigninSuccess,
  fetchItemsOnSigninFailure
} from "../cart/cart.actions";
import { updateCartItems, getCartItems } from "../../firebase/firebase.utils";

export function* updateItemsInCart() {
  try {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser != null) {
      const cartItems = yield select(selectCartItems);
      yield call(updateCartItems, cartItems, currentUser.id);
    }
  } catch (error) {
    console.log("error adding item to cart", error.message);
  }
}

export function* getCartItemsOnSignin({ payload: currentUser }) {
  try {
    const cartItemsBeforeSignin = yield select(selectCartItems);
    if (cartItemsBeforeSignin.length > 0) {
      yield put(fetchItemsOnSigninSuccess(cartItemsBeforeSignin));
      yield call(updateCartItems, cartItemsBeforeSignin, currentUser.id);
    } else {
      const cartItems = yield getCartItems(currentUser.id);
      yield put(fetchItemsOnSigninSuccess(cartItems));
    }
  } catch (error) {
    yield put(fetchItemsOnSigninFailure());
  }
}

export function* clearCartOnSignout() {
  yield put(clearCart());
}

export function* clearCartOnPayment() {
  yield put(clearCart());
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART
    ],
    updateItemsInCart
  );
}

export function* onSigninSuccess() {
  yield takeLatest(UserActionTypes.SIGNIN_SUCCESS, getCartItemsOnSignin);
}

export function* onSignoutSuccess() {
  yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout);
}

export function* onPaymentSuccess() {
  yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearCartOnPayment);
}

export function* cartSagas() {
  yield all([
    call(onCartChange),
    call(onSigninSuccess),
    call(onSignoutSuccess),
    call(onPaymentSuccess)
  ]);
}
