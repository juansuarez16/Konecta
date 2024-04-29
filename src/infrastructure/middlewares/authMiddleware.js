const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Obtener el token JWT del encabezado de autorización
  const token = req.headers.authorization.split(' ')[1];

  // Verificar el token JWT
  jwt.verify(token, 'secret_key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      // Adjuntar la información del usuario al objeto de solicitud
      req.userData = decodedToken;
      next();
    }
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userData.role)) {
      next();
    } else {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
  };
};

module.exports = { authenticateUser, authorizeRole };
