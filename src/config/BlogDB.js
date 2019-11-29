const Sequelize = require("sequelize");

const BlogDB = new Sequelize(process.env.DB_URL);

BlogDB
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully with the blog database.');
  })
  .catch(err => {
    console.error('Unable to connect to the blog database:', err);
  });

module.exports = BlogDB;