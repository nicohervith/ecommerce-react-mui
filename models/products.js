const mongoose = require("mongoose");

//El schema me permite definir el esquema de los datos
const { Schema } = mongoose;

const ProductsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductsSchema);
