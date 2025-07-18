const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.error("❌ Error: Token no proporcionado.");
        return res.status(403).json({ message: "Token no proporcionado." });
    }

    const token = authHeader.split(' ')[1];  // 🔥 Extrae el token quitando "Bearer"
    
    if (!token) {
        console.error("❌ Error: Token inválido.");
        return res.status(403).json({ message: "Token inválido." });
    }

    jwt.verify(token, process.env.SECRET_KEY || "defaultsecret", (err, user) => {
        if (err) {
            console.error("❌ Error: Token inválido o expirado.");
            return res.status(403).json({ message: "Token inválido o expirado." });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
