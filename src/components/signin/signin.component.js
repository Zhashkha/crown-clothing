import React, { useState } from "react";
import { connect } from "react-redux";

import {
  SigninContainer,
  TitleContainer,
  ButtonsContainer
} from "./signin.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSigninStart,
  emailSigninStart
} from "../../redux/user/user.actions";

const Signin = ({ emailSigninStart, googleSigninStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSigninStart(email, password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SigninContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          name="email"
          type="email"
          value={email}
          label="Email"
          required
        />
        <FormInput
          handleChange={handleChange}
          name="password"
          type="password"
          value={password}
          label="Password"
          required
        />
        <ButtonsContainer>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSigninStart}
            isGoogleSignin
          >
            Sign In With Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SigninContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSigninStart: () => dispatch(googleSigninStart()),
  emailSigninStart: (email, password) =>
    dispatch(emailSigninStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(Signin);
