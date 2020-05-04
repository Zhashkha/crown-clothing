import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart } from "../cart/cart.actions";

function* clearCartOnSignout() {
  yield put(clearCart());
}

function* clearCartOnPayment() {
  yield put(clearCart());
}

export function* onSignoutSuccess() {
  yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout);
}

export function* onPaymentSuccess() {
  yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearCartOnPayment);
}

export function* cartSagas() {
  yield all([call(onSignoutSuccess), call(onPaymentSuccess)]);
}
