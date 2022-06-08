import jsonwebtoken from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const token =
    req.header("Authorization")?.split(" ")[0] === "Bearer" &&
    req.header("Authorization").split(" ")[1];
  if (!token)
    return res.status(404).send({ message: "Authorization Token is required" });
  try {
    const decodedToken = await jsonwebtoken.decode(token);
    if (!decodedToken) {
      return res.status(404).send({ message: "Invalid token" });
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { isAuthenticated };
