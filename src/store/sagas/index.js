//root saga
import { takeEvery } from "redux-saga/effects";
import * as authSagas from "./auth";
import * as orderSagas from "./order";
import { initIngredients } from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, authSagas.logoutSaga);
  yield takeEvery(
    actionTypes.AUTH_CHECK_TIMEOUT,
    authSagas.checkAuthTimeoutSaga
  );
  yield takeEvery(actionTypes.AUTH_USER, authSagas.authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authSagas.authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, orderSagas.purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, orderSagas.fetchOrdersSaga);
  yield takeEvery(actionTypes.DELETE_ORDER, orderSagas.deleteOrderSaga);
}
