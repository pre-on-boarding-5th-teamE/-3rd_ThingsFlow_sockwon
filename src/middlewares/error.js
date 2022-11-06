/**
 * 커스텀 에러 생성기. new error(name, httpStatusCode, message)
 */

class BaseError extends Error {
  constructor(name, httpStatusCode, message) {
    super(message);

    this.name = name;
    this.statusCode = httpStatusCode;
    this.date = new Date();

    Error.captureStackTrace(this);
  }
}

/**
 * key 값이 비어 있는 경우 에러를 던진다.
 * @param {object | unknown} obj
 */

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

/**
 * target 이 legnth 보다 길면 에러를 던진다.
 * @param {string | any[]} target
 * @param {number} length
 */

const errorOfLength = (target, length) => {
  if (target.length > length) {
    throw new BaseError("key_error", 400, "invalid_key");
  }
};

/**
 * target 에 정규표현식의 요소가 있는지 검사함 reg.test(target)
 * @param {string} target
 * @param {'/정규표현식/'} regex
 */

const checkPassword = (target, regex) => {
  if (!regex.test(target)) {
    throw new BaseError("key_error", 400, "invalid_password");
  }
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  BaseError,
  findKeyError,
  errorOfLength,
  checkPassword,
};
