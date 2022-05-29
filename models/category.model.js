import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "'name' of the category is required"],
  },
  imgUrl: {
    type: String,
    required: [true, "'imgUrl' is required for the category"],
  },
});

export default mongoose.model("Category", categorySchema);
