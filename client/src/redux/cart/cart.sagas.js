import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart } from "../cart/cart.actions";

function* clearCartOnSignout() {
  yield put(clearCart());
}

export function* onSignoutSuccess() {
  yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout);
}

export function* cartSagas() {
  yield all([call(onSignoutSuccess)]);
}
