const Sequelize = require("sequelize");
const BlogDB = require("../config/BlogDB");

const Author = BlogDB.define("author", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
});

const AuthorSync = ({ force = false } = { force: false }) => {
  Author.sync({ force })
    .then(() => {
      const testAuthor = Author.build({
        firstName: "Test",
        lastName: "Author",
        email: "testauthor@gmail.com"
      });
      testAuthor.save()
        .then(result => {
          console.log(result.get())
        })
        .catch(console.error);
    })
    .catch(console.error)
};

exports.Author = Author;
exports.AuthorSync = AuthorSync;