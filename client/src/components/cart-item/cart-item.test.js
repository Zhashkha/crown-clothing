import React from "react";
import { shallow } from "enzyme";

import CartItem from "./cart-item.component";

describe("test CartItem", () => {
  let wrapper;

  beforeEach(() => {
    const mockItem = {
      imageUrl: "imageUrl",
      name: "name",
      price: 10.5,
      quantity: 2
    };

    wrapper = shallow(<CartItem item={mockItem} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
