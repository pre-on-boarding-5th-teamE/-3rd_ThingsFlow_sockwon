const axios = require("axios");
require("dotenv").config();

const weather = async (clientIp) => {
  const result = await axios({
    method: "get",
    url: `http://api.weatherapi.com/v1/current.json?key=${process.env.WETHERAPI_KEY}&q=${clientIp}&aqi=no`,
  });
  return result;
};

// weather().then((res) => console.log(res));

module.exports = { weather };
