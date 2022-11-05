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

  createResult = async () => {
    let { title, content, password, weather } = this.data.body;
    if (!weather) {
      weather = await this.getWeather();
    }

    const result = {
      weather,
      title,
      content,
      password,
    };

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
