/**
 * Module dependencies.
 */

const { database } = require("./database");
const { Posts } = require("../entity/Posts");

/**
 * 특정 테이블 내에 존재하는 id 인지 확인한다.
 * @param {string} tableName
 * @param {number} postId
 * @returns {0 | 1}
 */

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

/**
 * 게시글 쓰기
 * @param {object} data
 * @returns {object} InsertResult
 */

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

/**
 * 게시물 리스트
 * @returns {object}
 */

const getList = async () => {
  return await database
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .select(["posts.id as ID", "posts.title as 제목", "posts.weather as 날씨"])
    .orderBy("id", "ASC")
    .execute();
};

/**
 * 게시물 상세읽기
 * @param {number} postId
 * @returns {object}
 */

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

/**
 *
 * @param {number} postId
 * @returns string
 */

const getPassword = async (postId) => {
  return await database
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .select(["posts.password"])
    .where("posts.id=:id", { id: postId })
    .execute();
};

/**
 * 게시물 수정하기.
 * @param {number} postId
 * @param {object} contentOfUpdate
 * @returns {object} UpdateResult
 */

const updatePost = async (postId, contentOfUpdate) => {
  return await database
    .createQueryBuilder()
    .update(Posts)
    .set(contentOfUpdate)
    .where("id=:id", { id: postId })
    .execute();
};

/**
 * 게시물 지우기
 * @param {number} postId
 * @returns {object } DeleteResult
 */

const deletePost = async (postId) => {
  return await database
    .createQueryBuilder()
    .delete()
    .from(Posts)
    .where("id=:id", { id: postId })
    .execute();
};

/**
 * Module exports.
 * @public
 */

module.exports = {
  createPostDao,
  getList,
  getPost,
  getPassword,
  updatePost,
  deletePost,
  isExistId,
};
