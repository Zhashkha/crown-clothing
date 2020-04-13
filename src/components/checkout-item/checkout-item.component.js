import React from "react";
import { connect } from "react-redux";
import "./checkout-item.styles.scss";

import { addItem, removeItem, clearItemFromCart } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, addItemDisProp, removeItemDisProp, clearItemFromCartDisProp }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemDisProp(cartItem)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemDisProp(cartItem)}>&#10095;</div>
      </span>
      <span className="price">${price}</span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCartDisProp(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCartDisProp: (item) => dispatch(clearItemFromCart(item)),
  addItemDisProp: (item) => dispatch(addItem(item)),
  removeItemDisProp: (item) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
