const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    savedBooks: {
      type: [
        {
          book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
          },
          format: {
            type: String,
            enum: ["Hardcover", "Paperback", "Ebook", "Audiobook"],
            required: true
          },
          shelf: {
            type: String,
            enum: ["To Read", "Currently Reading", "Read"],
            default: "To Read"
          },
          notes: {
            type: String,
            default: ""
          },
          rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
          },
          addedAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
