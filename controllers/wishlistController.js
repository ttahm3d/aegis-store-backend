import User from "../models/User.js";

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    await User.updateOne(
      { _id: req.userId },
      { $push: { wishlist: productId } }
    );
    const user = await User.findById(req.userId).populate("wishlist");
    res.send(user.wishlist);
  } catch (error) {
    res.send({ message: error });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("wishlist");
    res.send(user.wishlist);
  } catch (error) {
    res.send({ message: error });
  }
};

export { addToWishlist, getWishlist };
