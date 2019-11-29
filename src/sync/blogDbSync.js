const { UserSync } = require("../models/Users");
const { AuthorSync } = require("../models/Authors");
const { PostSync } = require("../models/Posts");

UserSync({ force: true });
AuthorSync({ force: true });
PostSync();