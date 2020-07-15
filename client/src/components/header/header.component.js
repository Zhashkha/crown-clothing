import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionContainerLink
} from "./header.styles";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { signoutStart } from "../../redux/user/user.actions";

export const Header = ({ currentUser, hidden, signoutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      <OptionContainerLink to="/shop">SHOP</OptionContainerLink>
      {currentUser ? (
        <OptionContainerLink as="div" onClick={signoutStart}>
          SIGN OUT
        </OptionContainerLink>
      ) : (
        <OptionContainerLink to="/signin">SIGN IN</OptionContainerLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
  signoutStart: () => dispatch(signoutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
