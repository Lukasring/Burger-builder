import { put, delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("exparationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEybHw70mbZ8WFEkMj6beWNSnCFFHbknQ";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEybHw70mbZ8WFEkMj6beWNSnCFFHbknQ";
  }

  try {
    const response = yield axios.post(url, authData);
    const exparationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("exparationDate", exparationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.log(error);
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const exparationDate = yield new Date(
      localStorage.getItem("exparationDate")
    );
    if (exparationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (exparationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      actions.logout();
    }
  }
}
