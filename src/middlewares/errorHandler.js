const errorHandlerAsync = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
};

module.exports = {
  errorHandlerAsync,
};
