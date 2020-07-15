import React from "react";
import { shallow } from "enzyme";

import { MenuItem } from "./menu-item.component";

describe("test MenuItem", () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  let mockLinkUrl;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    };
    mockMatch = {
      url: "url"
    };
    mockLinkUrl = "linkUrl";

    const mockProps = {
      title: "",
      imageUrl: "",
      size: "",
      history: mockHistory,
      match: mockMatch,
      linkUrl: mockLinkUrl
    };

    wrapper = shallow(<MenuItem {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push on MenuItemContainer click", () => {
    wrapper.find("MenuItemContainer").simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.url}${mockLinkUrl}`
    );
  });
});
