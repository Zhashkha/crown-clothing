import React, { useState } from "react";
import { connect } from "react-redux";

import { SignupContainer, TitleContainer } from "./signup.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signupStart } from "../../redux/user/user.actions";

const Signup = ({ signupStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    signupStart({ email, password, displayName });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignupContainer>
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} className="signup-form">
        <FormInput
          onChange={handleChange}
          type="text"
          name="displayName"
          value={displayName}
          label="Display Name"
          required
        />
        <FormInput
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
          label="Email"
          required
        />
        <FormInput
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
          label="Password"
          required
        />
        <FormInput
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignupContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signupStart: (userCredentials) => dispatch(signupStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(Signup);
