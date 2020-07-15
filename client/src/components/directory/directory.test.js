import React from "react";
import { shallow } from "enzyme";

import { Directory } from "./directory.component";
import MenuItem from "../menu-item/menu-item.component";

describe("test Directory", () => {
  let wrapper;
  let mockSections;

  beforeEach(() => {
    mockSections = [{ id: 1 }, { id: 2 }];
    wrapper = shallow(<Directory sections={mockSections} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render same amout of MenuItem elements as mock sections are", () => {
    expect(wrapper.find(MenuItem).length).toBe(mockSections.length);
  });
});
