import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import {PaymentElement} from '@stripe/react-stripe-js';

const PaymentForm = ({description, amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(stripe,elements);
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
      
      // use stripe.createToken to get a unique token for the card
      const { error, token } = await stripe.createToken(cardElement);
  
      if (!error) {
        // Backend is not implemented yet, but once there isn’t any errors,
        // you can pass the token and payment data to the backend to complete
        // the charge
        axios
          .post("/api/payments/", {
            description,
            source: token.id,
            currency: 'usd',
            amount: (amount)*100

          })
          .then((resp) => {
            alert("Your payment was successful");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
      <div>
      
      <CardElement  options={{
            style: {
                base: inputStyle,
            },
        }}/>
        <button>PAY</button>
      </div>
        
      </form>
    );
  };
  const CardInputWrapper = {
  border: '2px solid #00f',
  borderRadius: '8px',
  padding: '20px 4px'
  }
  
  const inputStyle = {
    iconColor: '#c4f0ff',
    border: '10px solid green',
    color: '#ff0',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
}
  export default PaymentForm;