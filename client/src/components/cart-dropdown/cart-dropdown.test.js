import React from "react";
import { shallow } from "enzyme";

import { CartDropdown } from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

describe("test CartDropdown component", () => {
  let wrapper;
  const mockHistory = { push: jest.fn() };
  const mockDispatch = jest.fn();
  const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

  beforeEach(() => {
    const mockProps = {
      cartItems: mockCartItems,
      history: mockHistory,
      dispatch: mockDispatch
    };

    wrapper = shallow(<CartDropdown {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("cartItems elements count should be equal to mock items length", () => {
    expect(wrapper.find(CartItem).length).toBe(mockCartItems.length);
  });

  it("button click should call push history and dispatch toggleCartHidden", () => {
    wrapper.find(CustomButton).simulate("click");
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
  });

  it("EmptyMessageContainer should appear when these is no mock cart items", () => {
    const mockProps = {
      cartItems: [],
      history: mockHistory,
      dispatch: mockDispatch
    };

    wrapper = shallow(<CartDropdown {...mockProps} />);
    expect(wrapper.exists("EmptyMessageContainer")).toBe(true);
  });
});
