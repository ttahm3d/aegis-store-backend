import Product from "../models/product.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      features = [],
      aegisAssured,
      imgUrl,
      discount,
      categoryId,
      actualPrice,
      sellingPrice,
      rating = 0,
      inStockQty = 100,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      features,
      aegisAssured,
      imgUrl,
      discount,
      categoryId,
      actualPrice,
      sellingPrice,
      rating,
      inStockQty,
    });
    res.status(201).send({ product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    if (products.length === 0)
      return res.status(200).send({ message: "No Products found" });
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      return res.status(200).send({ message: "No Products found" });
    }
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { addProduct, getProducts, getProductById };
