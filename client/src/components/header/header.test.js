import React from "react";
import { shallow } from "enzyme";

import { Header } from "./header.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

describe("test Header", () => {
  let wrapper;
  let mockSignoutStart;

  beforeEach(() => {
    mockSignoutStart = jest.fn();

    const mockProps = {
      currentUser: { uid: 1 },
      hidden: false,
      signoutStart: mockSignoutStart
    };

    wrapper = shallow(<Header {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call signoutStart on OptionContainerLink click", () => {
    wrapper.find("OptionContainerLink").at(1).simulate("click");
    expect(mockSignoutStart).toHaveBeenCalled();
  });

  it("should render CartDropdown when hidden is false", () => {
    expect(wrapper.exists(CartDropdown)).toBe(true);
  });
});
