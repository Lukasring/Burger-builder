import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <React.Fragment>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem link="/auth">Log In</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
