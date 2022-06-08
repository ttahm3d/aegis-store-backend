import User from "../models/user";

const addToWishlist = (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.send(user)
  } catch (error) {
    res.send({message: error})
  }
}
export { addToWishlist }