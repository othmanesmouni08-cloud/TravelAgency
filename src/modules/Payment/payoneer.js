const axios = require('axios');
const {
  PAYONEER_MODE,
  PAYONEER_USERNAME,
  PAYONEER_PASSWORD,
  PAYONEER_PARTNER_ID,
  PAYONEER_API_KEY
} = require('../../config/env');
const ApiError = require('../../utils/ApiError');

const PAYONEER_API_BASE_URL = PAYONEER_MODE === 'live'
  ? 'https://api.payoneer.com/v2'
  : 'https://sandbox.payoneer.com/v2';

const payoneerConfig = {
  username: PAYONEER_USERNAME,
  password: PAYONEER_PASSWORD,
  partnerId: PAYONEER_PARTNER_ID,
  apiKey: PAYONEER_API_KEY
};

/**
 * Create Payoneer Payment
 * @param {string} payeeEmail - Payoneer account email
 * @param {number} amount - Amount in USD
 * @param {string} description - Payment description
 */
exports.createPayment = async (payeeEmail, amount, description) => {
  try {
    const response = await axios.post(
      `${PAYONEER_API_BASE_URL}/payouts/`,
      {
        username: payoneerConfig.username,
        password: payoneerConfig.password,
        partner_id: payoneerConfig.partnerId,
        payee_email: payeeEmail,
        amount: amount.toString(),
        currency: 'USD',
        reference: `PAYMENT_${Date.now()}`,
        description: description
      },
      {
        headers: {
          'Authorization': `Bearer ${payoneerConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new ApiError(400, `Payoneer error: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Get Payment Status
 * @param {string} paymentId - Payoneer payment ID
 */
exports.getPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(
      `${PAYONEER_API_BASE_URL}/payouts/${paymentId}/`,
      {
        headers: {
          'Authorization': `Bearer ${payoneerConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new ApiError(400, `Payoneer status error: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Verify Payoneer Account
 * @param {string} email - Email to verify
 */
exports.verifyAccount = async (email) => {
  try {
    const response = await axios.post(
      `${PAYONEER_API_BASE_URL}/accounts/verify/`,
      {
        username: payoneerConfig.username,
        password: payoneerConfig.password,
        email: email
      },
      {
        headers: {
          'Authorization': `Bearer ${payoneerConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new ApiError(400, `Payoneer verification error: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Get Account Balance
 */
exports.getBalance = async () => {
  try {
    const response = await axios.get(
      `${PAYONEER_API_BASE_URL}/accounts/balance/`,
      {
        headers: {
          'Authorization': `Bearer ${payoneerConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new ApiError(400, `Payoneer balance error: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Cancel Payment
 * @param {string} paymentId - Payoneer payment ID
 */
exports.cancelPayment = async (paymentId) => {
  try {
    const response = await axios.post(
      `${PAYONEER_API_BASE_URL}/payouts/${paymentId}/cancel/`,
      {
        username: payoneerConfig.username,
        password: payoneerConfig.password
      },
      {
        headers: {
          'Authorization': `Bearer ${payoneerConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new ApiError(400, `Payoneer cancellation error: ${error.response?.data?.message || error.message}`);
  }
};
