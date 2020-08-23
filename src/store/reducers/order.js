import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      const updatedProperties = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
      return updateObject(state, updatedProperties);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.orders,
      });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.DELETE_ORDER_SUCCESS:
      const newOrders = state.orders.filter(
        (order) => order.id !== action.orderId
      );
      return updateObject(state, { orders: newOrders });
    default:
      return state;
  }
};

export default reducer;
