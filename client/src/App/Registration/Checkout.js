import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


const STRIPE_PUBLISHABLE = "pk_test_2XgFZYwKpyVZ9mDucI0LqdTQ00ZbMJF5Ae";

const CURRENCY = 'USD';

const fromEuroToCent = amount => amount * 100;
const PAYMENT_SERVER_URL = "/api/payments/"
const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;