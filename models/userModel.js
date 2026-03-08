const mongoose = require("mongoose");
const ALL_WORLD_CURRENCIES = require('../config/currencies')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never return password by default
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
      uppercase: true,
      trim: true,

      enum: {
        values: ALL_WORLD_CURRENCIES,
        message: (props) =>
          `${props.value} is not a valid ISO-4217 currency code`
      },

      validate: {
        validator: function (value) {
          return ALL_WORLD_CURRENCIES.includes(value);
        },
        message: (props) =>
          `Invalid currency '${props.value}'. Please use a valid ISO-4217 currency code`
      }
    }

  },
  {
    timestamps: true,
    strict: true, // Prevents extra unwanted fields
  }
);

// Remove password when sending JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);

