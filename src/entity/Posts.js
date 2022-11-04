const EntitySchema = require("typeorm").EntitySchema;

const Posts = new EntitySchema({
  name: "Posts",
  tableName: "posts",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      nullable: false,
    },
    title: {
      type: "varchar",
      length: 20,
      nullable: false,
    },

    content: {
      type: "varchar",
      length: 200,
      nullable: true,
    },
    weather: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    password: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
  },
});

module.exports = {
  Posts,
};
