import React from "react";
import "./signin.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signinWithGoogle } from "../../firebase/firebase.utils";

class Signin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signin">
        <h2 className="title">I already have an account</h2>
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
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signinWithGoogle} isGoogleSignin>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
