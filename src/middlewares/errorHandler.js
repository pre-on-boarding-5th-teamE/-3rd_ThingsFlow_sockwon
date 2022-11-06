/**
 * 던져진 에러를 잡아낸다. 주로 미들웨어로 사용됨. routes.
 * @param {function} func
 * @returns void
 */

const errorHandlerAsync = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  errorHandlerAsync,
};
