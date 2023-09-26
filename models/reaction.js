const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  },
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
  },
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format("D/M/YYYY HH:MM"),
    },
  }
);

const Reactions = model("Reactions", reactionSchema);

module.exports = Reactions;
