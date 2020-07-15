import React from "react";
import { shallow } from "enzyme";

import CustomButton from "./custom-button.component";

it("should match snapshot", () => {
  expect(shallow(<CustomButton />)).toMatchSnapshot();
});
