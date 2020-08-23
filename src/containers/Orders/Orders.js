import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

import Order from "../../components/Order/Order/Order";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  // componentDidUpdate() {
  //   this.props.onFetchOrders();
  // }

  deleteOrderHandler = (orderId) => {
    console.log("Deleting...");
    this.props.onDeleteOrder(orderId);
  };

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          delete={() => this.deleteOrderHandler(order.id)}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
