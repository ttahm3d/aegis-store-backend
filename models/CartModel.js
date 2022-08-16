import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    product: {
      ref: "Product",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "'quantity' can't be less than 1"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
