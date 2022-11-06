/**
 * Module dependencies.
 */

const { DataSource } = require("typeorm");
const { Posts } = require("../entity/Posts");

/**
 * typeORM 사용. 데이터베이스와 연결 설정. 구동은 server.js 에서.
 */

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: false,
  synchronize: true,
  entities: [Posts],
  charset: "utf8mb4",
});

/**
 * Module exports.
 * @public
 */

module.exports = {
  database,
};
