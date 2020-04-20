import React from "react";

import { SignupContainer, TitleContainer } from "./signup.styles";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class Signup extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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

export default Signup;
