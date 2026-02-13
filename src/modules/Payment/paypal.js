const paypal = require('paypal-rest-sdk');
const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = require('../../config/env');
const ApiError = require('../../utils/ApiError');

// Configure PayPal SDK
paypal.configure({
  mode: PAYPAL_MODE,
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_CLIENT_SECRET,
  headers: {
    'custom': 'header'
  }
});

/**
 
 * @param {object} paymentData 
 */
exports.createPayment = async (paymentData) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        reject(new ApiError(400, `PayPal error: ${error.message}`));
      } else {
        resolve(payment);
      }
    });
  });
};

/**
 * Execute PayPal Payment
 * @param {string} paymentId - Payment ID
 * @param {string} payerId - Payer ID from redirect
 */
exports.executePayment = async (paymentId, payerId) => {
  return new Promise((resolve, reject) => {
    const executePaymentJson = {
      payer_id: payerId
    };

    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
      if (error) {
        reject(new ApiError(400, `PayPal execution error: ${error.message}`));
      } else {
        resolve(payment);
      }
    });
  });
};

/**
 * Get Payment Details
 * @param {string} paymentId - Payment ID
 */
exports.getPayment = async (paymentId) => {
  return new Promise((resolve, reject) => {
    paypal.payment.get(paymentId, (error, payment) => {
      if (error) {
        reject(new ApiError(400, `PayPal get error: ${error.message}`));
      } else {
        resolve(payment);
      }
    });
  });
};

/**
 * Create Sale Refund
 * @param {string} saleId - Sale ID
 * @param {object} refundData - Refund details (optional amount)
 */
exports.refundSale = async (saleId, refundData = {}) => {
  return new Promise((resolve, reject) => {
    paypal.sale.find(saleId, (error, sale) => {
      if (error) {
        reject(new ApiError(400, `PayPal sale find error: ${error.message}`));
      } else {
        sale.refund(refundData, (err, refund) => {
          if (err) {
            reject(new ApiError(400, `PayPal refund error: ${err.message}`));
          } else {
            resolve(refund);
          }
        });
      }
    });
  });
};

/**
 * Create PayPal Payout (for vendor payments)
 * @param {string} recipientEmail - Recipient email
 * @param {number} amount - Amount to payout
 * @param {string} currency - Currency code
 */
exports.createPayout = async (recipientEmail, amount, currency = 'USD') => {
  return new Promise((resolve, reject) => {
    const payoutData = {
      sender_batch_header: {
        sender_batch_id: `Payout_${Date.now()}`,
        email_subject: 'You have a payment'
      },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: {
            value: amount.toString(),
            currency: currency
          },
          receiver: recipientEmail,
          note: 'Your payment from trip bookings'
        }
      ]
    };

    paypal.payout.create(payoutData, (error, payout) => {
      if (error) {
        reject(new ApiError(400, `PayPal payout error: ${error.message}`));
      } else {
        resolve(payout);
      }
    });
  });
};

/**
 * Build PayPal Redirect URL
 * @param {object} approvalUrl - Approval URL from payment
 */
exports.getApprovalUrl = (payment) => {
  const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
  return approvalUrl ? approvalUrl.href : null;
};
