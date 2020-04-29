import React from "react";
import { connect } from "react-redux";

import {
  SigninContainer,
  TitleContainer,
  ButtonsContainer
} from "./signin.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSigninStart,
  emailSigninStart
} from "../../redux/user/user.actions";

class Signin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { emailSigninStart } = this.props;
    const { email, password } = this.state;

    emailSigninStart(email, password);
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { googleSigninStart } = this.props;

    return (
      <SigninContainer>
        <TitleContainer>I already have an account</TitleContainer>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            label="Email"
            required
          />
          <FormInput
            handleChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            label="Password"
            required
          />
          <ButtonsContainer>
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSigninStart}
              isGoogleSignin
            >
              Sign In With Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SigninContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSigninStart: () => dispatch(googleSigninStart()),
  emailSigninStart: (email, password) =>
    dispatch(emailSigninStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(Signin);
