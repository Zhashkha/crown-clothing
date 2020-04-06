import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignin,
  inverted,
  ...otherProps
}) => (
  <button
    {...otherProps}
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignin ? "google-signin" : ""
    } custom-button`}
  >
    {children}
  </button>
);

export default CustomButton;
