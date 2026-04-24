const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      default: ""
    },
    authors: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      default: ""
    },
    pageCount: {
      type: Number,
      default: null
    },
    coverImage: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
