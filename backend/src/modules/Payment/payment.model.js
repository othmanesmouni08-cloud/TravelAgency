const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: 'User',
      required: false // Allow guest checkout if needed
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    items: [{
      id: String,
      name: String,
      price: Number,
      type: { type: String, enum: ['hotel', 'car', 'activity'] },
      details: String
    }],
=======
      required: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
>>>>>>> Taoufiq
    amount: {
      type: Number,
      required: true,
      min: 0
    },
<<<<<<< HEAD
    customerName: String,
    paymentMethod: {
      type: String,
      default: 'credit_card'
    },
=======
>>>>>>> Taoufiq
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
