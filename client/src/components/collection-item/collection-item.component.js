import React from "react";
import { connect } from "react-redux";

import {
  CollectionItemContainer,
  BackgroundImage,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";
import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItemDisProp }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage imageUrl={imageUrl} className="image" />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButton onClick={() => addItemDisProp(item)} inverted>
        Add to cart
      </CustomButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemDisProp: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
