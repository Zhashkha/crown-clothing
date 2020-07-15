import React from "react";
import { shallow } from "enzyme";

import { CartIcon } from "./cart-icon.component";

describe("test CartIcon", () => {
  let wrapper;
  const mockToggleCartHidden = jest.fn();
  const mockItemCount = 3;

  beforeEach(() => {
    const mockProps = {
      toggleCartHidden: mockToggleCartHidden,
      itemCount: mockItemCount
    };

    wrapper = shallow(<CartIcon {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call toggleCartHidden on CartIconContainer click", () => {
    wrapper.find("CartIconContainer").simulate("click");
    expect(mockToggleCartHidden).toHaveBeenCalled();
  });

  it("ItemCountContainer should have itemCount value content", () => {
    let content = wrapper.find("ItemCountContainer").text();
    expect(parseInt(content)).toBe(mockItemCount);
  });
});
