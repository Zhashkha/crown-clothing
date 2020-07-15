import React from "react";
import { shallow } from "enzyme";

import { CollectionItem } from "./collection-item.component";

describe("test CollectionItem", () => {
  let wrapper;
  let mockAddItem;

  beforeEach(() => {
    mockAddItem = jest.fn();

    const mockProps = {
      item: {
        imageUrl: "imageUrl",
        name: "name",
        price: 10.5
      },
      addItem: mockAddItem
    };

    wrapper = shallow(<CollectionItem {...mockProps} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call addItem on AddButton click", () => {
    wrapper.find("AddButton").simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });
});
