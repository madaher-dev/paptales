const mongoose = require("mongoose");
const playerSchema = mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a player Name"],
    },
    clerkId: {
      type: String,
      required: [true, "Please provide a clerkId"],
    },

    age: Number,
    gender: {
      type: String,
      enum: {
        values: ["boy", "girl"],
        message: "Unsupported gender option",
      },
    },
    style: {
      type: String,
      enum: {
        values: ["fairy", "adventure", "fun"],
        message: "Unsupported style option",
      },
    },
    language: {
      type: String,
      enum: {
        values: ["english", "spanish", "french", "russian"],
        message: "Unsupported language option",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
playerSchema.index({ email: 1 }, { unique: true });
playerSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);
module.exports = Player;
