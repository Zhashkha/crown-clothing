import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { connect } from "react-redux";

import { paymentSuccess } from "../../redux/user/user.actions";

const StripeCheckoutButton = ({ price, paymentSuccess }) => {
  const priceForStripe = price * 100;
  const pubblishableKey = "pk_test_Oyx2qGYPTnzJ6cWvcuG5CJ8Z00vELpTRhn";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then((response) => {
        alert("Payment successful");
        paymentSuccess();
      })
      .catch((error) => {
        console.log("Payment error: ", error.response.data);
        alert(
          "There was an issue with your payment. Please sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={pubblishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  paymentSuccess: () => dispatch(paymentSuccess())
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
