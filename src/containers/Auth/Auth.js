import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Auth.module.css";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      label: "E-mail",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      label: "Password",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((element) => (
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
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p style={{ color: "red" }}>{props.error.message}</p>;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignUp ? "Sign Up" : "Sign In"}</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>{`Switch to ${
        isSignUp ? "Sign In" : "Sign Up"
      } `}</Button>
      {errorMessage}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
