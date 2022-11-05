const postService = require("../services/postService");
const { createApp } = require("../../app");
const { database } = require("../models/database");
const data = require("../middlewares/container");
const postDao = require("../models/postDao");
const request = require("supertest");

describe("CRRUD test:", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await database.initialize();

    const example1 = {
      body: {
        title: "first",
        content: "first content",
        password: "password1111",
        weather: "Sunny",
      },
    };

    const example2 = {
      body: {
        title: "second",
        content: "second content",
        password: "password1111",
        weatther: "Clear",
      },
    };

    await postService.creatPostService(new data(example1));
    await postService.creatPostService(new data(example2));
  });
  afterAll(async () => {
    await database.query(`TRUNCATE posts`);
    await database.destroy();
  });

  describe("게시글 쓰기 테스트:", () => {
    test("게시글 쓰기 성공: statusCode 201", async () => {
      await request(app)
        .post("/api/v1/posts")
        .send({
          title: "third",
          content: "third content",
          password: "password1111",
          weather: "Clear",
        })
        .expect(201)
        .expect({ message: "success" });
    });

    test("게시글 쓰기 실패: statusCode 400, 본문 200자 넘김. 274글자", async () => {
      await request(app)
        .post("/api/v1/posts")
        .send({
          title: "제목있음",
          content:
            "본문 내용을 200자 넘기는게 쉬운 일이 아니다. 그래서 아무말이나 적어봅니다. 가나다라마바사 평소에는 200자 넘기기 어렵지 않았는데 막상 넘기려고 하니 귀찮습니다. 이런저런말을 아무거나 막 던져대도 지금 200자는 아닌것 같습니다. 언제 쯤 넘길 수 있을 까요. $@#$ 문자열은 저장 할때 곤란 합니다. 중간에 잘라서 세로 길게 하는게 안되서. 보기 불편합ㄴ디ㅏ. ㅇㄹㅁ내ㅑ러매ㅑㄴㅇ러ㅏㅓ 200자 넘겼을까?????? 넘긴것 같은데 이제 그만 쓰고 싶다. ㅏㄹㄹ@#ㄸㄲㅁㄴㅇㄹㄹㄴㄹㄴㅁ",
          password: "password1111",
          weather: "Clear",
        })
        .expect(400)
        .expect({ message: "invalid_key" });
    });

    test("게시글 쓰기 실패: statusCode 400, 제목 길이 20자 넘김", async () => {
      await request(app)
        .post("/api/v1/posts")
        .send({
          title:
            "제목있음 제목이 너무 길면 안됩니다. 20자 넘어가는 경우 예외 처리 대상이 됩니다. 이제 보세요. 20자는 확실히 넘었나요?",
          content: "본문 내용 있음",
          password: "password1111",
          weather: "Clear",
        })
        .expect(400)
        .expect({ message: "invalid_key" });
    });

    test("게시글 쓰기 실패: statusCode 400, 비밀번호 형식-6자 이상, 최소 1글자는 숫자여야 한다.", async () => {
      await request(app)
        .post("/api/v1/posts")
        .send({
          title: "제목있음",
          content: "본문 내용 있음",
          password: "password",
          weather: "Clear",
        })
        .expect(400)
        .expect({ message: "invalid_password" });
    });
  });

  describe("게시글 읽기 테스트", () => {
    test("게시글 상세 읽기 성공: statusCode 200", async () => {
      const response = await request(app).get("/api/v1/posts/1");
      const value = response.body.result[0]["제목"];
      expect(response.status).toBe(200);
      expect(value).toBe("first");
    });

    test("게시글 상세 읽기 실패 없는 게시물: statusCode 404", async () => {
      const response = await request(app).get("/api/v1/posts/999");
      expect(response.status).toBe(404);
    });

    test("게시글 리스트 읽기 성공:statusCode 200", async () => {
      const response = await request(app).get("/api/v1/posts");
      expect(response.status).toBe(200);
      expect(response.body.result.length).toBe(3);
    });
  });

  //   describe('게시글 수정', ()=>{
  //     test('게시글 수정 성공: statusCode ')
  //   })
});
