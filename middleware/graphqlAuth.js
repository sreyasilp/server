import jwt from "jsonwebtoken";

const secret = "mySecret";

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decodedToken;
  next();
};

export default { generateToken, verifyToken, authenticate };
