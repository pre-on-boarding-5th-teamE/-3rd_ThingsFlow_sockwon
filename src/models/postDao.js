const { database } = require("./database");
const { Posts } = require("../entity/Posts");

const createPostDao = async (data) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(Posts)
    .values({
      title: data["title"],
      content: data["content"],
      password: data["password"],
      weather: data["weather"],
    })
    .execute();
};

const getList = async () => {
  return await database
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .select(["posts.id as ID", "posts.title as 제목", "posts.weather as 날씨"])
    .execute();
};

module.exports = {
  createPostDao,
  getList,
};
