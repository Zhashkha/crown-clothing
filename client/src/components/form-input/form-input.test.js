import React from "react";
import { shallow } from "enzyme";

import FormInput from "./form-input.component";

describe("test FormInput", () => {
  let wrapper;
  let mockHandleChange;

  beforeEach(() => {
    mockHandleChange = jest.fn();

    const mockProps = {
      handleChange: mockHandleChange,
      label: "label",
      value: ""
    };

    wrapper = shallow(<FormInput {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call mockHandleChange on onChange", () => {
    wrapper.find("FormInputContainer").simulate("change");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("should render FormInputLabel", () => {
    expect(wrapper.exists("FormInputLabel")).toBe(true);
  });
});
