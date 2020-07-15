import React from "react";
import { shallow } from "enzyme";

import HomePage from "./home.component";

it("test HomePage snapshot", () => {
  expect(shallow(<HomePage />)).toMatchSnapshot();
});
