import User from "../models/User.js";

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({
      message:
        "`firstName`, `lastName`, `email` and `password` are all required for user signup",
    });
  }
  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 1000),
      httpOnly: true,
      secure: true,
      samesite: "none",
    };
    res.status(201).cookie("token", token, options).json({
      user: {
        firstName,
        lastName,
        email,
      },
      token,
      message: "Singup Successfull",
    });
  } catch (error) {
    if (error.code === 11000)
      res.status(500).send({ message: "Email is already in registered" });
    else res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "`email` and `password` are required for login",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .send({ message: "You are not registered. Created account now" });
    }

    const isPasswordValid = user.isPasswordValid(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Email and password do not match" });
    }
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
      .json({ user, token, message: "Login Successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).send({ message: "Logout successfull" });
};

export { signup, login, logout };
