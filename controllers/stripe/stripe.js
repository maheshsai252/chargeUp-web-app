const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = 'sk_test_51GJYg1BmQsf5m3ISkwpWeRNT3AlckyOohYqsKLAnYCdViTw8HrWDMSNNQylOvn2AbSYQqfxhVb93cPn2Ct75866Z00CWN87Zik';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
