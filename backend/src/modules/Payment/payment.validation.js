const { body, param } = require('express-validator');

const validateCreatePayment = [
  body('bookingId').isMongoId().withMessage('Invalid booking ID'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
];

const validatePaymentId = [
  param('id').isMongoId().withMessage('Invalid payment ID')
];

const validateUpdateStatus = [
  body('status').isIn(['pending', 'completed', 'failed', 'refunded']).withMessage('Invalid status')
];

module.exports = {
  validateCreatePayment,
  validatePaymentId,
  validateUpdateStatus
};
