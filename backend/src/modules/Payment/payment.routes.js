const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middleware/auth.middleware');
const paymentController = require('./payment.controller');

const {
  validateCreatePayment,
  validatePaymentId,
  validateUpdateStatus
} = require('./payment.validation');
const validate = require('../../middleware/validate.middleware');

// Create payment
router.post('/', authenticate, validateCreatePayment, validate, paymentController.createPayment);

// Cart Checkout
router.post('/checkout', (req, res, next) => {
  // Authentication is optional for checkout
  next();
}, paymentController.processCheckout);

// Get user payment history
router.get('/', authenticate, paymentController.getUserPayments);

// Get payment by ID
router.get('/:id', authenticate, validatePaymentId, validate, paymentController.getPayment);

// Update status
router.patch('/:id/status', authenticate, validatePaymentId, validateUpdateStatus, validate, paymentController.updateStatus);

module.exports = router;
