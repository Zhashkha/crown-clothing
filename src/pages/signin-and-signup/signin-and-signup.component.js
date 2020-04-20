import React from "react";

import { SigninAndSignupContainer } from "./signin-and-signup.styles";
import Signin from "../../components/signin/signin.component";
import Signup from "../../components/signup/signup.component";

const SigninAndSignupPage = () => (
  <SigninAndSignupContainer>
    <Signin />
    <Signup />
  </SigninAndSignupContainer>
);

export default SigninAndSignupPage;
