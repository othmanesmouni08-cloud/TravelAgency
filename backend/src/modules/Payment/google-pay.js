const ApiError = require('../../utils/ApiError');


exports.validateToken = async (token) => {
  try {

    if (!token || typeof token !== 'string') {
      throw new ApiError(400, 'Invalid Google Pay token');
    }

    // Parse the token (typically comes as JSON)
    const parsedToken = JSON.parse(Buffer.from(token, 'base64').toString());

    return {
      valid: true,
      data: parsedToken
    };
  } catch (error) {
    throw new ApiError(400, `Google Pay validation error: ${error.message}`);
  }
};

/**
 * Process Google Pay Payment
 * Note: Most Google Pay processing is done on client-side with Stripe/PayPal
 * This is a wrapper for server-side validation
 */
exports.processPayment = async (paymentData) => {
  try {
    const { token, amount, currency } = paymentData;

    // Validate token
    await exports.validateToken(token);

    // Google Pay payments are typically processed through Stripe or PayPal
    // This is where you'd integrate with your payment processor
    return {
      success: true,
      message: 'Google Pay payment processed',
      data: {
        amount,
        currency,
        status: 'pending' // Will be updated by webhook
      }
    };
  } catch (error) {
    throw new ApiError(400, `Google Pay payment error: ${error.message}`);
  }
};
