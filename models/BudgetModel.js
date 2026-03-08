const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true
    },

    month: {
      type: Number,
      required: [true, "Month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"]
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2000, "Year must be valid"]
    },

    spendingLimit: {
      type: Number,
      required: [true, "Spending limit is required"],
      min: [0, "Spending limit cannot be negative"]
    },

    savingsTarget: {
      type: Number,
      required: [true, "Savings target is required"],
      min: [0, "Savings target cannot be negative"]
    }
  },
  {
    timestamps: true
  }
);

budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

budgetSchema.pre("save", function (next) {
  if (this.savingsTarget > this.spendingLimit) {
    return next(new Error("Savings target cannot exceed spending limit"));
  }
  next();
});

module.exports = mongoose.model("Budget", budgetSchema);
