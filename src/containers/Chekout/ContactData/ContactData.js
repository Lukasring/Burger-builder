import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    ingredients: this.props.ingredients,
    loading: false,
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandlder = (event) => {
    event.preventDefault();
    console.log("ordering...");
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    //production, geriau kaina butu skaiciuot back end
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price,
      customer: {
        name: "Lukas",
        id: "666",
        adress: {
          street: "Real street 123",
          zipCode: "666420",
          country: "North Corea",
        },
        email: "real@mail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
        console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="your name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="your street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="your postal code"
          />
          <Button
            btnType="Success"
            clicked={(event) => this.orderHandlder(event)}
          >
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
