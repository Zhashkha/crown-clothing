import React from "react";
import { shallow } from "enzyme";

import { CheckoutPage } from "./checkout.component";

let wrapper;
beforeEach(() => {
  const mockProps = { cartItems: [], total: 100 };

  wrapper = shallow(<CheckoutPage {...mockProps} />);
});

it("test CheckoutPage snapshot", () => {
  expect(wrapper).toMatchSnapshot();
});
