const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      try {
        const user = req.user; 
  
        if (!user || user.rol !== requiredRole) {
          return res.status(403).json({ message: 'Acceso denegado. No tienes permisos para acceder a esta ruta.' });
        }
  
        next(); 
      } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    };
  };
  
  module.exports = roleMiddleware;
  