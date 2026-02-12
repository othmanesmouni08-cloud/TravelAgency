const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = require('../../config/env');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const ApiError = require('../../utils/ApiError');

 
exports.createPaymentIntent = async (amount, currency = 'usd', customerId, metadata = {}) => {
  try {
    const paymentIntentData = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString()
      }
    };

    if (customerId) {
      paymentIntentData.customer = customerId;
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);
    return paymentIntent;
  } catch (error) {
    throw new ApiError(400, `Stripe error: ${error.message}`);
  }
};


exports.confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId
    });
    return paymentIntent;
  } catch (error) {
    throw new ApiError(400, `Stripe confirmation error: ${error.message}`);
  }
};


exports.createCustomer = async (email, metadata = {}) => {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata
    });
    return customer;
  } catch (error) {
    throw new ApiError(400, `Stripe customer error: ${error.message}`);
  }
};


 
exports.createRefund = async (chargeId, amount = null, reason = 'requested_by_customer') => {
  try {
    const refundData = {
      charge: chargeId,
      reason
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to cents
    }

    const refund = await stripe.refunds.create(refundData);
    return refund;
  } catch (error) {
    throw new ApiError(400, `Stripe refund error: ${error.message}`);
  }
};


exports.verifyWebhookSignature = (body, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    throw new ApiError(400, `Webhook signature verification failed: ${error.message}`);
  }
};
