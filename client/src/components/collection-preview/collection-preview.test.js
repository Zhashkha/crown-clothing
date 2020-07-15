import React from "react";
import { shallow } from "enzyme";

import { CollectionPreview } from "./collection-preview.component";
import CollectionItem from "../collection-item/collection-item.component";

describe("test CollectionPreview", () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  let mockRouteName;
  let mockItems;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    };
    mockMatch = {
      path: "path"
    };
    mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    mockRouteName = "routeName";

    const mockProps = {
      title: "",
      routeName: mockRouteName,
      items: mockItems,
      history: mockHistory,
      match: mockMatch
    };

    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push on TitleContainer click", () => {
    wrapper.find("TitleContainer").simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.path}/${mockRouteName}`
    );
  });

  it("should render only 4 CollectionItem elements", () => {
    expect(wrapper.find(CollectionItem).length).toBe(4);
  });
});
