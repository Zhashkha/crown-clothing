import React from "react";
import { mount } from "enzyme";
import { combineReducers, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ShopPage } from "./shop.component";

const createMockStore = ({ state, reducers }) => {
  const store = createStore(combineReducers(reducers), state);

  return {
    ...store,
    persistor: {
      persist: () => null
    }
  };
};

describe("ShopPage", () => {
  let wrapper;
  let store;
  let mockFetchCollectionsStart;

  beforeEach(() => {
    const mockReducer = (state = { isFetching: true }, action) => state;

    const mockState = {
      shop: {
        isFetching: true
      }
    };

    store = createMockStore({
      state: mockState,
      reducers: { shop: mockReducer }
    });

    const mockMatch = {
      path: ""
    };

    mockFetchCollectionsStart = jest.fn();

    const mockProps = {
      match: mockMatch,
      fetchCollectionsStart: mockFetchCollectionsStart
    };

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ShopPage {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("test ShopPage snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("ShopPage should be mounted and therefore fetchCollectionsStart should be called", () => {
    expect(mockFetchCollectionsStart).toHaveBeenCalled();
  });
});
