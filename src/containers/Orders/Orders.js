import React, { useEffect } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

import Order from "../../components/Order/Order/Order";

const Orders = (props) => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  const deleteOrderHandler = (orderId) => {
    props.onDeleteOrder(orderId, token);
  };

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
        delete={() => deleteOrderHandler(order.id)}
      />
    ));
  }
  if (!props.loading && props.orders.length === 0) {
    orders = <p style={{ textAlign: "center" }}>There are no orders!</p>;
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (orderId, token) =>
      dispatch(actions.deleteOrder(orderId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
