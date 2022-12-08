const stripe = require('../controllers/stripe/stripe');

module.exports = (app) => {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get('/', (req, res) => {
        res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
      });
    
    app.post('/api/payments/', (req, res) => {
        stripe.charges.create(req.body, postStripeCharge(res));
      });
    
    app.post('/api/refund', (req,res) => {
        const refundAmount = stripe.refunds.create({
            charge: req.body.chargeId,
        }, (err, refund) => {
            if(refund) {
                res.status(200).send({message: 'Refund successful', refundObj: refund})
            } else {
                res.status(200).send({message: 'Refund failed', refundObj:{}})
               
            }
        });
    })
    app.post("/payment/create-payment-intent", async (req, res) => {
        try {
            console.log("coming", req.body);
          const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: req.body.amount*100,
            description: req.body.description,
            receipt_email: req.body.email,
            automatic_payment_methods: { enabled: true },
          });
          console.log(paymentIntent,"intent")
          // Send publishable key and PaymentIntent details to client
          res.status(200).send({

            clientSecret: paymentIntent.client_secret,
          });
        } catch (e) {
            console.log(e)
          return res.status(400).send({
            error: {
              message: e.message,
            },
          });
        }
      });
      

}  
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log(stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    console.log(stripeRes);
    res.status(200).send({ success: stripeRes });
  }
}


