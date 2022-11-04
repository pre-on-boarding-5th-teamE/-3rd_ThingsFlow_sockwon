class Request {
  constructor(req) {
    this.data = req;
  }

  getClientIp = () => {
    const requestIp = require("request-ip");
    const ip = requestIp.getClientIp(this.data);
    return ip;
  };

  getWeather = async () => {
    const { weather } = require("./weather");
    const ip = this.getClientIp();
    const result = await weather(ip);
    return result["data"]["current"]["condition"]["text"];
  };

  getBody = () => {
    const result = this.data.body;
    return result;
  };

  getPostId = () => {
    const { postId } = this.data.params;
    return postId;
  };

  getContentOfUpdate = () => {
    const { title, content } = this.getBody();
    return { title, content };
  };
}

module.exports = Request;
