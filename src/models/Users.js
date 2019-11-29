const Sequelize = require("sequelize");
const BlogDB = require("../config/BlogDB");
const { generateHashSync } = require("../utils/hash");

const User = BlogDB.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: Sequelize.STRING,
}, {
  setterMethods: {
    password(plainTextPassword) {
      this.setDataValue("password", generateHashSync(plainTextPassword));
    },
  },
  getterMethods: {
    password() {
      return "******";
    },
    fullName() {
      return this.getDataValue("firstName") + " " + this.getDataValue("lastName");
    }
  }
});

const UserSync = ({ force = false } = { force: false }) => {
  User.sync({ force })
    .then(() => {
      const testUser = {
        firstName: "Dani",
        lastName: "Akash",
        email: "user@test.com",
        password: "123456",
      };

      User.create(testUser)
        .then(result => {
          console.log(result.get());
        })
        .catch(console.error)
    })
    .catch(console.error);
};

exports.User = User;
exports.UserSync = UserSync;