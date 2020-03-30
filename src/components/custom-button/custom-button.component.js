import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignin, ...otherProps }) => (
  <button
    {...otherProps}
    className={`${isGoogleSignin ? "google-signin" : ""} custom-button`}
  >
    {children}
  </button>
);

export default CustomButton;
