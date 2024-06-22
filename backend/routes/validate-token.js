const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verificar;
        console.log('Token verified:', req.user);  // Añadir log para verificar el contenido del token
        next();
    } catch (error) {
        res.status(400).json({ error: 'token no es valido' });
    }
};

module.exports = verifyToken;