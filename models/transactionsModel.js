const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true
    },

    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: {
        values: ["income", "expense"],
        message: "Transaction type must be either 'income' or 'expense'"
      }
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters"],
      maxlength: [50, "Category cannot exceed 50 characters"]
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"]
    },

    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
      default: ""
    },

    date: {
      type: Date,
      required: [true, "Transaction date is required"],
      default: Date.now
    }
  },
  {
    timestamps: true,
    strict: true
  }
);

/* Performance Indexes (important for analytics & queries) */

transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });
transactionSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);