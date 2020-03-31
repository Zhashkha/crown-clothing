import React from "react";
import "./signin-and-signup.styles.scss";

import Signin from "../../components/signin/signin.component";
import Signup from "../../components/signup/signup.component";

const SigninAndSignupPage = () => (
  <div className="signin-and-signup">
    <Signin />
    <Signup />
  </div>
);

export default SigninAndSignupPage;
