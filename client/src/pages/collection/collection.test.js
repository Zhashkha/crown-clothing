import React from "react";
import { shallow } from "enzyme";

import { CollectionPage } from "./collection.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

describe("CollectionPage", () => {
  let wrapper;
  let mockItems = [{ id: 1, id: 2, id: 3 }];
  beforeEach(() => {
    const mockProps = {
      collection: { title: "", items: mockItems }
    };

    wrapper = shallow(<CollectionPage {...mockProps} />);
  });

  it("test CollectionPage snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the same number of CollectionItem components as in mock array", () => {
    expect(wrapper.find(CollectionItem).length).toBe(mockItems.length);
  });
});
