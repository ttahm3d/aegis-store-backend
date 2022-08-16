import Cart from "../models/CartModel.js";

const addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .send({ message: "Please provide 'productId' in the request body" });
    }
    const cartItemExists = await Cart.findOne({
      user: req.userId,
      product: productId,
    });
    if (cartItemExists) {
      cartItemExists.quantity = cartItemExists.quantity + 1;
      await cartItemExists.save();
      const cartItems = await Cart.find({ user: req.userId }).populate(
        "product"
      );
      return res.status(200).send({ ...cartItems });
    }
    await Cart.create({ user: req.userId, product: productId });
    const cartItems = await Cart.find({ user: req.userId }).populate("product");
    res.status(201).send({ cartItems });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.userId })
      .populate("product")
      .populate("user");
    return res.status(200).send({ ...cartItems });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const increaseItemQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .send({ message: "Please provide 'productId' in the request body" });
    }
    const cartItemExists = await Cart.findOne({
      user: req.userId,
      product: productId,
    });
    if (!cartItemExists) {
      return res
        .status(500)
        .send({ message: "'product does not exist in cart" });
    }
    cartItemExists.quantity = cartItemExists.quantity + 1;
    await cartItemExists.save();
    const cartItems = await Cart.find({ user: req.userId }).populate("product");
    return res.status(200).send({ ...cartItems });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const decreaseItemQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .send({ message: "Please provide 'productId' in the request body" });
    }
    const cartItemExists = await Cart.findOne({
      user: req.userId,
      product: productId,
    });
    if (!cartItemExists) {
      return res
        .status(500)
        .send({ message: "'product does not exist in cart" });
    }
    if (cartItemExists.quantity === 1) {
      return res
        .status(500)
        .send({ message: "product quantity cannot be less than 1" });
    }
    cartItemExists.quantity = cartItemExists.quantity - 1;
    await cartItemExists.save();
    const cartItems = await Cart.find({ user: req.userId }).populate("product");
    return res.status(200).send({ ...cartItems });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    await Cart.findOneAndDelete({
      user: req.userId,
      product: productId,
    });
    const cartItems = await Cart.find({ user: req.userId }).populate("product");
    return res.status(200).send({ ...cartItems });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export {
  addItemToCart,
  decreaseItemQuantity,
  getCartItems,
  increaseItemQuantity,
  removeItemFromCart,
};
