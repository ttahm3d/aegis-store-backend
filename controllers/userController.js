import User from "../models/user.js";

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send({
      message:
        "`firstName`, `lastName`, `email` and `password` are all required for user signup",
    });
  } else {
    try {
      const user = await User.create({ firstName, lastName, email, password });
      const token = user.getJwtToken();
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 1000),
        httpOnly: true,
        secure: true,
        samesite: "none",
      };
      res
        .status(201)
        .cookie("token", token, options)
        .json({ user, token, message: "User created" });
    } catch (error) {
      if (error.code === 11000)
        res.status(500).send({ message: "Email is already in registered" });
      else res.status(500).send({ message: error.message });
    }
  }
};

export { signup };
