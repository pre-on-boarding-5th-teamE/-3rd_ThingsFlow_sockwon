class BaseError extends Error {
  constructor(name, httpStatusCode, message) {
    super(message);

    this.name = name;
    this.statusCode = httpStatusCode;
    this.date = new Date();

    Error.captureStackTrace(this);
  }
}

const findKeyError = (obj) => {
  if (typeof obj === "object") {
    if (
      (Array.isArray(obj) && obj.length === 0) ||
      Object.keys(obj).length === 0
    ) {
      throw new BaseError("key_error", 400, "invalid_key");
    }
    for (let i in obj) {
      if (!obj[i]) {
        throw new BaseError("key_error", 400, "invalid_key");
      }
    }
  } else {
    if (!obj) {
      throw new BaseError("key_error", 400, "invalid_key");
    }
  }
};

module.exports = {
  BaseError,
  findKeyError,
};
