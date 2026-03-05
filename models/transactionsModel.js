const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
    {
        // add fields accrodingly
    },
    {
        timestamps: true,
        strict: true, //  prevents extra fields from being saved
    },
);

module.exports = mongoose.model("transaction", transactionsSchema);