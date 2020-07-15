import CartActionTypes from "./cart.types";
import cartReducer from "./cart.reducer";

describe("test cart reducer", () => {
  const INITIAL_STATE = {
    hidden: true,
    cartItems: []
  };

  const mockItems = [
    {
      id: 1,
      quantity: 1
    },
    {
      id: 2,
      quantity: 2
    }
  ];
  const mockCartItem = { id: 1, quantity: 3 };

  it("test initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("test TOGGLE_CART_HIDDEN action type", () => {
    expect(
      cartReducer(INITIAL_STATE, { type: CartActionTypes.TOGGLE_CART_HIDDEN })
        .hidden
    ).toBe(false);
  });

  it("test ADD_ITEM action type", () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [mockCartItem]
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.ADD_ITEM,
        payload: mockCartItem
      }).cartItems[0].quantity
    ).toBe(4);
  });

  it("test REMOVE_ITEM action type", () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [mockCartItem]
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.REMOVE_ITEM,
        payload: mockCartItem
      }).cartItems[0].quantity
    ).toBe(2);
  });

  it("test CLEAR_ITEM_FROM_CART action type", () => {
    const mockPrevState = {
      hidden: true,
      cartItems: [mockCartItem, { id: 2, quantity: 2 }]
    };

    expect(
      cartReducer(mockPrevState, {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: mockCartItem
      }).cartItems.includes((item) => item.id === 1)
    ).toBe(false);
  });

  it("test CLEAR_CART action type", () => {
    expect(
      cartReducer(
        { ...INITIAL_STATE, cartItems: mockItems },
        {
          type: CartActionTypes.CLEAR_CART
        }
      ).cartItems.length
    ).toBe(0);
  });

  it("test FETCH_ITEMS_ON_SIGNIN_SUCCESS action type", () => {
    expect(
      cartReducer(INITIAL_STATE, {
        type: CartActionTypes.FETCH_ITEMS_ON_SIGNIN_SUCCESS,
        payload: mockItems
      }).cartItems
    ).toEqual(mockItems);
  });

  it("test FETCH_ITEMS_ON_SIGNIN_FAILURE action type", () => {
    expect(
      cartReducer(INITIAL_STATE, {
        type: CartActionTypes.FETCH_ITEMS_ON_SIGNIN_FAILURE
      })
    ).toEqual(INITIAL_STATE);
  });
});
