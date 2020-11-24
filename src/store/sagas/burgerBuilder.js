import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* initIngredients(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-55769.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    //! get request will always fail because firebase is deleted.
    //! ingriedients are hardcoded now.
    yield put(
      actions.setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 0 })
    );

    // yield put(actions.fetchIngredientsFailed());
  }
}
