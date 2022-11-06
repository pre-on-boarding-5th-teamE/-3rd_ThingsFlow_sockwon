/**
 * request 와 관련 메소드를 클래스로 묶어서 사용함
 */

class Request {
  constructor(req) {
    this.data = req;
  }

  /**
   * 클라이언트의 ip 를 반환함.
   * @returns {string}
   */

  getClientIp = () => {
    /**
     * Module dependencies.
     */
    const requestIp = require("request-ip");

    const ip = requestIp.getClientIp(this.data);
    return ip;
  };

  /**
   * 외부 api 'https://www.weatherapi.com/' 의 current 값을 받아옴
   * @returns {string}
   */
  getWeather = async () => {
    /**
     * Module dependencies.
     */
    const { weather } = require("./weather");
    const ip = this.getClientIp();
    const result = await weather(ip);
    return result["data"]["current"]["condition"]["text"];
  };

  /**
   * 게시글 쓰기 api(/api/v1/posts)
   * @returns {object}
   */

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

  /**
   * request body 를 반환한다.
   * @returns {object}
   */
  getBody = () => {
    const { body } = this.data;
    return body;
  };

  /**
   * request params 에서 postId 를 반환해준다
   * @returns {number}
   */

  getPostId = () => {
    const { postId } = this.data.params;
    return postId;
  };

  /**
   * request body 에서 title, content 를 반환해준다
   * @returns {object}
   */

  getContentOfUpdate = () => {
    const { title, content } = this.data.body;
    return { title, content };
  };
}

/**
 * Module exports.
 * @public
 */

module.exports = Request;
