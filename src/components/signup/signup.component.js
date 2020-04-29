import React from "react";
import { connect } from "react-redux";

import { SignupContainer, TitleContainer } from "./signup.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signupStart } from "../../redux/user/user.actions";

class Signup extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    const { signupStart } = this.props;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    signupStart({ email, password, displayName });
  };

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <SignupContainer>
        <TitleContainer>I do not have an account</TitleContainer>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <FormInput
            onChange={this.handleChange}
            type="text"
            name="displayName"
            value={displayName}
            label="Display Name"
            required
          />
          <FormInput
            onChange={this.handleChange}
            type="email"
            name="email"
            value={email}
            label="Email"
            required
          />
          <FormInput
            onChange={this.handleChange}
            type="password"
            name="password"
            value={password}
            label="Password"
            required
          />
          <FormInput
            onChange={this.handleChange}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </SignupContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signupStart: (userCredentials) => dispatch(signupStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(Signup);
