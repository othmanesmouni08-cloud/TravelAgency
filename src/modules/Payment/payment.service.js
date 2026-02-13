const Payment = require('./payment.model');
const ApiError = require('../../utils/ApiError');

/**
 * Create payment record
 */
exports.createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
};

/**
 * Get payment by ID
 */
exports.getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }
  return payment;
};

/**
 * Get user payment history
 */
exports.getUserPayments = async (userId, options = {}) => {
  const { limit = 10, skip = 0, status } = options;
  const query = { userId };

  if (status) {
    query.status = status;
  }

  const payments = await Payment.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Payment.countDocuments(query);

  return { payments, total, pages: Math.ceil(total / limit) };
};

/**
 * Update payment status
 */
exports.updatePaymentStatus = async (paymentId, status) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { status },
    { new: true }
  );

  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }

  return payment;
};
