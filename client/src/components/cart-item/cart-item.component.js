import React from "react";

import {
  CartItemContainer,
  BackgroundImage,
  ItemDetailsContainer,
  NameContainer,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, name, price, quantity } }) => (
  <CartItemContainer>
    <BackgroundImage src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <NameContainer>{name}</NameContainer>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default React.memo(CartItem);
