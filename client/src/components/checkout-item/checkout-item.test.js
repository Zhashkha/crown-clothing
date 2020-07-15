import React from "react";
import { shallow } from "enzyme";

import { CheckoutItem } from "./checkout-item.component";

describe("test CheckoutItem", () => {
  let wrapper;
  let mockAddItem;
  let mockRemoveItem;
  let mockClearItemFromCart;

  beforeEach(() => {
    mockAddItem = jest.fn();
    mockRemoveItem = jest.fn();
    mockClearItemFromCart = jest.fn();

    const mockProps = {
      cartItem: {
        imageUrl: "imageUrl",
        name: "name",
        price: 10.5,
        quantity: 2
      },
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      clearItemFromCart: mockClearItemFromCart
    };

    wrapper = shallow(<CheckoutItem {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call removeItem on QuantityContainer first div click", () => {
    wrapper.find("QuantityContainer").childAt(0).simulate("click");
    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it("should call addItem on QuantityContainer second div click", () => {
    wrapper.find("QuantityContainer").childAt(2).simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should call clearItemFromCart on RemoveButtonContainer click", () => {
    wrapper.find("RemoveButtonContainer").simulate("click");
    expect(mockClearItemFromCart).toHaveBeenCalled();
  });
});
