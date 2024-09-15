const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorizeation"]?.split("")[1]; //Get token from Authorization header ??

    if (!token) {
        return res.status(403).json({ message: "no Token provided" });
    }

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;