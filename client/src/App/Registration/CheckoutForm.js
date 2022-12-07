import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const appearance = {
    theme: 'night',
    labels: 'floating'
  };
export default function CheckoutForm({event}) {
  const stripe = useStripe();
  const elements = useElements({});

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/`,
      },
    });
    if(res.paymentIntent.status === "succeeded") {
        setIsProcessing(false);
        console.log("payment succeded");
        userRegister();

    }
    setMessage(res.paymentIntent.status);

    console.log(res.paymentIntent.status,"er");
    if (res.error.type === "card_error" || res.error.type === "validation_error") {
      setMessage(res.error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  const userRegister = async () => {
    console.log(event._id,sessionStorage.getItem('userid'),"details");
    try {
        const response = await axios.post('/api/registration/create',{
            userid: sessionStorage.getItem('userid'),
            eventId: event._id
        });
        console.log( response,"gotten")
        if(response.status===200) {
            setMessage("Registration successful")
        }
    } catch (error) {
        console.log(error.response.data.message,"error")
        // console.log(response.data)
        setMessage(error.response.data.message);
    }
    
    
}
 
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />

      <div style={{marginTop: 0}}class="register-container">
            <div class="actions">
            <button className="register-btn action__submit" disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Register"}
              </span>
            </button>
        {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
                {/* <a href="#" class="register-btn action__submit">Place your Order</a> */}
            </div>
        </div> 
      
    </form>
  );
}
