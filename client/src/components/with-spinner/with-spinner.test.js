import React from "react";
import { shallow } from "enzyme";

import WithSpinner from "./with-spinner.component";
import Spinner from "../spinner/spinner.component";

describe("test WithSpinner", () => {
  const TestComponent = () => <div>Test Component</div>;
  const WrappedComponent = WithSpinner(TestComponent);

  it("should render Spinner when isLoading is true", () => {
    let wrapper = shallow(<WrappedComponent isLoading={true} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it("should render WrappedComponent when isLoading is false", () => {
    let wrapper = shallow(<WrappedComponent isLoading={false} />);
    expect(wrapper.exists(TestComponent)).toBe(true);
  });
});
