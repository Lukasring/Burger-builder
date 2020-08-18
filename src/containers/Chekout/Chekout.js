import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import CheckoutSummary from "../../components/Order/ChekoutSummary/ChekoutSummary";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log(ingredients);
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    console.log("continue..");
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={
                this.state.totalPrice ? this.state.totalPrice.toFixed(2) : null
              }
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
