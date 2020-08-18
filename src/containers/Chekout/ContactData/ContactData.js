import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
  };

  orderHandlder = (event) => {
    event.preventDefault();
    console.log("ordering...");
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    //production, geriau kaina butu skaiciuot back end
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandlder}>
          {formElementsArray.map((element) => (
            <Input
              key={element.id}
              inputType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              changed={(event) => this.inputChangedHandler(event, element.id)}
            />
          ))}
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
