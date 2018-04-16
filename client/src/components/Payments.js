import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    //console.log(process.env.REACT_APP_STRIPE_KEY);

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey="pk_test_1SJkeK7MFdNY64H1pXLNZMjx"
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
    //stripeKey="pk_test_1SJkeK7MFdNY64H1pXLNZMjx"
    //stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
  }
}

export default connect(null, actions)(Payments);
