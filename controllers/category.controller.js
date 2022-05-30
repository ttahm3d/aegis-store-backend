import Category from "../models/category.js";

const addCategory = async (req, res) => {
  try {
    const { name, imgUrl } = req.body;
    const category = await Category.create({
      name,
      imgUrl,
    });
    res.status(201).send({ category });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories && categories.length === 0)
      return res.status(404).send({ message: "No categories found" });
    res.status(200).send({ categories });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { addCategory, getCategories };
