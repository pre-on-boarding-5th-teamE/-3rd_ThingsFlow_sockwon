const { weather } = require("../middlewares/weather");

describe("15. 날씨 api 테스트: ", () => {
  test("성공: statusCode 200", async () => {
    //네이버 ip 주소
    const result = await weather("125.209.222.14");
    expect(result.status).toBe(200);
  });
});
