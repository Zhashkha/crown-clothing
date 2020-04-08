import React from "react";
import { connect } from "react-redux";
import "./cart-dropdown.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItemsStateProp }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItemsStateProp.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItemsStateProp: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropdown);
