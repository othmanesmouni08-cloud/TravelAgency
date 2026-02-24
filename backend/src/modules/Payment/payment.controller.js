const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');
const paymentService = require('./payment.service');
const stripeService = require('./stripe');
const Booking = require('../Booking/bookingModel');

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
/**
 * Process Cart Checkout
 */
exports.processCheckout = asyncHandler(async (req, res) => {
  const { cart, customerName, emailAddress, phoneNumber, specialRequest, paymentMethod } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  // Calculate total on server side
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const serviceCharge = 50; // Fixed booking fee
  const totalAmount = subtotal + serviceCharge;

  // Create Stripe PaymentIntent
  const paymentIntent = await stripeService.createPaymentIntent(
    totalAmount,
    'mad', // Use MAD currency
    null, // customerId (optional)
    {
      customerName,
      items: JSON.stringify(cart.map(i => i.id)), // valid metadata
    }
  );

  // Create initial payment record in database
  const payment = await paymentService.createPayment({
    userId: req.user?.userId || null,
    items: cart,
    amount: totalAmount,
    customerName,
    paymentMethod,
    stripePaymentIntentId: paymentIntent.id,
    status: 'pending'
  });

  // Create Booking records for each item in the cart
  if (cart && cart.length > 0) {
    for (const item of cart) {
      // Use provided dates or default to Today -> Tomorrow
      const startDate = item.startDate ? new Date(item.startDate) : new Date();
      const endDate = item.endDate ? new Date(item.endDate) : new Date(new Date().setDate(new Date().getDate() + 1));

      await Booking.create({
        customerId: req.user?.userId || null,
        customerName,
        emailAddress,
        phoneNumber,
        specialRequest,
        serviceId: item.id,
        serviceType: item.type || 'car', // Default to car if missing
        status: 'pending',
        startDate: startDate,
        endDate: endDate,
        totalPrice: item.price,
        paymentId: payment._id
      });
    }
  }

  res.status(200).json(
    new ApiResponse(200, {
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      amount: totalAmount
    }, 'Payment intent created')
  );
});

/**
 * Confirm Payment Success
 */
exports.confirmPaymentSuccess = asyncHandler(async (req, res) => {
  const { paymentIntentId, paymentId } = req.body;

  if (!paymentIntentId || !paymentId) {
    throw new ApiError(400, 'Missing payment confirmation details');
  }

  // 1. Verify with Stripe that it actually succeeded
  const paymentIntent = await stripeService.retrievePaymentIntent(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    throw new ApiError(400, `Payment not successful. Status: ${paymentIntent.status}`);
  }

  // 2. Update our database
  const payment = await paymentService.updatePaymentStatus(paymentId, 'completed');

  res.status(200).json(
    new ApiResponse(200, payment, 'Payment confirmed and recorded as completed')
  );
});
