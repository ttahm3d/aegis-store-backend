import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "'userId' is required for performing any actions"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required for updating cart"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
