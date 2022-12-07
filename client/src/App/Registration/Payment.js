import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const appearance = {
    theme: 'night',
    labels: 'floating'
  };

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const STRIPE_PUBLISHABLE = "pk_test_2XgFZYwKpyVZ9mDucI0LqdTQ00ZbMJF5Ae";

  
  useEffect(() => {
    console.log(loadStripe(STRIPE_PUBLISHABLE))
  }, []);

  useEffect(() => {
    const res = async () => {
        const response = await axios.post('/payment/create-payment-intent', {
            amount: props.amount,
            description: props.description,
            email: props.email
        });
        console.log(response);

        setClientSecret(response.data.clientSecret);
        setStripePromise(loadStripe(STRIPE_PUBLISHABLE));

        console.log(clientSecret,stripePromise)
    }
    
    res();

  }, [props.email]);

  return (
    <div>
      {/* <h1> Payment Page</h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm event={props.event}/>
        </Elements>
      )}
    </div>
  );
}

export default Payment;
