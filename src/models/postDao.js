const { database } = require("./database");
const { Posts } = require("../entity/Posts");

const isExistId = async (table, value) => {
  const result = await database.query(
    `
          SELECT EXISTS(
              SELECT
                  id
              FROM ${table}
              WHERE id = '${value}'
          ) as id
          `
  );
  return Number(result[0].id);
};

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

const getPost = async (postId) => {
  return await database
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .select([
      "posts.id as ID",
      "posts.title as 제목",
      "posts.content as 내용",
      "posts.weather as 날씨",
    ])
    .where("posts.id=:id", { id: postId })
    .execute();
};

const getPassword = async (postId) => {
  return await database
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .select(["posts.password"])
    .where("posts.id=:id", { id: postId })
    .execute();
};

const updatePost = async (postId, contentOfUpdate) => {
  return await database
    .createQueryBuilder()
    .update(Posts)
    .set(contentOfUpdate)
    .where("id=:id", { id: postId })
    .execute();
};

const deletePost = async (postId) => {
  return await database
    .createQueryBuilder()
    .delete()
    .from(Posts)
    .where("id=:id", { id: postId })
    .execute();
};

module.exports = {
  createPostDao,
  getList,
  getPost,
  getPassword,
  updatePost,
  deletePost,
  isExistId,
};
