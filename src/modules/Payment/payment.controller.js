const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const paymentService = require('./payment.service');

/**
 * Create Payment
 */
exports.createPayment = asyncHandler(async (req, res) => {
  const { bookingId, amount } = req.body;

  const payment = await paymentService.createPayment({
    userId: req.user.userId,
    bookingId,
    amount,
    status: 'pending'
  });

  res.status(201).json(
    new ApiResponse(201, payment, 'Payment record created successfully')
  );
});

/**
 * Get Payment Details
 */
exports.getPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.id);

  res.json(
    new ApiResponse(200, payment, 'Payment retrieved successfully')
  );
});

/**
 * Get User Payment History
 */
exports.getUserPayments = asyncHandler(async (req, res) => {
  const { limit = 10, skip = 0, status } = req.query;
  const paymentHistory = await paymentService.getUserPayments(req.user.userId, {
    limit: parseInt(limit),
    skip: parseInt(skip),
    status
  });

  res.json(
    new ApiResponse(200, paymentHistory, 'Payment history retrieved successfully')
  );
});

/**
 * Update Status
 */
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const payment = await paymentService.updatePaymentStatus(req.params.id, status);

  res.json(
    new ApiResponse(200, payment, 'Payment status updated successfully')
  );
});
