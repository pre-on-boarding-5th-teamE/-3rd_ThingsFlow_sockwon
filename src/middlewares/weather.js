/**
 * Module dependencies.
 */

const axios = require("axios");
require("dotenv").config();

/**
 * 날씨 api 와 통신한다. current 값을 응답으로 받아온다.
 * @param {string} clientIp
 * @returns {object} axios({...})
 */

const weather = async (clientIp) => {
  const result = await axios({
    method: "get",
    url: `http://api.weatherapi.com/v1/current.json?key=${process.env.WETHERAPI_KEY}&q=${clientIp}&aqi=no`,
  });
  return result;
};

/**
 * Module exports.
 * @public
 */

module.exports = { weather };
