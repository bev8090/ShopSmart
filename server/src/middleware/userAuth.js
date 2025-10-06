import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.log("No token detected.");
    return res.status(401).json({ message: "Please log in to view this page." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    console.log("Invalid token", error);
    res.status(402).json({ message: "Token not valid. Please log in again." });
  }
};

export const adminAuth = async (req, res, next) => {
  if (!req.user.isAdmin) {
    console.log("Admin access required");
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
};