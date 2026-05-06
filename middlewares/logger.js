const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[${res.statusCode}] ${req.method} ${req.path} — ${Date.now() - start}ms`);
  });
  next();
};

module.exports = logger;
