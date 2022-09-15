const mongoose = require("mongoose");

const connect_db = function (url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
module.exports = connect_db;
