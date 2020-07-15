import CartActionTypes from "./cart.types";
import * as actions from "./cart.actions";

describe("test actions", () => {
  const mockCartItem = {
    id: 1,
    quantity: 1
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

  it("test toggleCartHidden", () => {
    expect(actions.toggleCartHidden().type).toBe(
      CartActionTypes.TOGGLE_CART_HIDDEN
    );
  });

  it("test addItem", () => {
    expect(actions.addItem(mockCartItem).type).toBe(CartActionTypes.ADD_ITEM);

    expect(actions.addItem(mockCartItem).payload).toEqual(mockCartItem);
  });

  it("test removeItem", () => {
    expect(actions.removeItem(mockCartItem).type).toBe(
      CartActionTypes.REMOVE_ITEM
    );

    expect(actions.removeItem(mockCartItem).payload).toEqual(mockCartItem);
  });

  it("test clearItemFromCart", () => {
    expect(actions.clearItemFromCart(mockCartItem).type).toBe(
      CartActionTypes.CLEAR_ITEM_FROM_CART
    );

    expect(actions.clearItemFromCart(mockCartItem).payload).toEqual(
      mockCartItem
    );
  });

  it("test clearCart", () => {
    expect(actions.clearCart().type).toBe(CartActionTypes.CLEAR_CART);
  });

  it("test fetchItemsOnSigninSuccess", () => {
    expect(actions.fetchItemsOnSigninSuccess(mockItems).type).toBe(
      CartActionTypes.FETCH_ITEMS_ON_SIGNIN_SUCCESS
    );

    expect(actions.fetchItemsOnSigninSuccess(mockItems).payload).toEqual(
      mockItems
    );
  });

  it("test fetchItemsOnSigninFailure", () => {
    expect(actions.fetchItemsOnSigninFailure().type).toBe(
      CartActionTypes.FETCH_ITEMS_ON_SIGNIN_FAILURE
    );
  });
});
