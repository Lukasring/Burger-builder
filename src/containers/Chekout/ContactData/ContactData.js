import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/order";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      label: "Name",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      label: "Street",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      label: "ZIP code",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      label: "Country",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      label: "E-mail",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      label: "Delivery method",
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandlder = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    //production, geriau kaina butu skaiciuot back end
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onPurchase(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedOrderFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      <form onSubmit={orderHandlder}>
        {formElementsArray.map((element) => (
          <Input
            key={element.id}
            label={element.config.label}
            inputType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => inputChangedHandler(event, element.id)}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          Order
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchase: (order, token) => dispatch(purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
