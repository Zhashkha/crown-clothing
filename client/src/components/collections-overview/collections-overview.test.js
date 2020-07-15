import React from "react";
import { shallow } from "enzyme";

import { CollectionsOverview } from "./collections-overview.component";

it("should match snapshot", () => {
  expect(shallow(<CollectionsOverview collections={[]} />)).toMatchSnapshot();
});
