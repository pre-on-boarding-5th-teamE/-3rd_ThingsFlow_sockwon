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

module.exports = {
  createPostDao,
};
