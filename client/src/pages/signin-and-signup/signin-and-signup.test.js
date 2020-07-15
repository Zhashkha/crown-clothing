import React from "react";
import { shallow } from "enzyme";

import SigninAndSignupPage from "./signin-and-signup.component";

it("test SigninAndSignupPage snapshot", () => {
  expect(shallow(<SigninAndSignupPage />)).toMatchSnapshot();
});
