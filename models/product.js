import mongoose from "mongoose";
import { stringify } from "uuid";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "'name' of the product is required"],
  },
  description: {
    type: String,
    required: [true, "'description' of the product is required"],
    trim: true,
  },
  features: {
    type: [String],
    default: [],
  },
  aegisAssured: {
    type: Boolean,
    required: [true, "'aegisAssured' of the product is required"],
  },
  imgUrl: {
    type: String,
    required: [true, "'imgUrl' is required for a product"],
  },
  discount: {
    type: Number,
    required: [true, "'discount' of the product is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "'categoryId' is required for a product"],
  },
  actualPrice: {
    type: Number,
    required: [true, "'actualPrice' of the product is required"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "'sellingPrice' of the product is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  inStockQty: {
    type: Number,
    default: 100,
  },
});

export default mongoose.model("Product", productSchema);
