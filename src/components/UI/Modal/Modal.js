import React from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const modal = (props) => {
  //pakeista i react.memo
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     this.props.show !== nextProps.show ||
  //     this.props.children !== nextProps.children
  //   );
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(modal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
});
