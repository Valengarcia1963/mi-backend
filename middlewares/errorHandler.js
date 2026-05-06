const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}`, err.message);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;
