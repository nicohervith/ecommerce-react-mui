const mongoose = require("mongoose");

const URI = "mongodb://localhost/ecommerce-db";
//De esta manera conecto a la base de datos de manera local
mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.errror(err));

module.exports = mongoose;
