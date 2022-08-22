const express = require("express");
const products = require("../models/products");
const router = express.Router();

//Esto me permite hacerle consultas a la db
const Products = require("../models/products");

router.get("/", async (req, res) => {
  //Esta funcion me muestra en consola los datos de la db
  //Guardo los datos de la db dentro de una variable
  const Products = await Products.find();
  console.log(Products);
  res.json(Products);
});

router.get("/:id", async (req, res) => {
  const products = await Products.findById(req.params.id);
  res.json(Products);
});

router.post("/", async (req, res) => {
  //console.log(req.body);
  const { name, price } = req.body;
  //Esto me crea un nuevo objeto
  const products = new products({ name, price });
  //Esto utilizo para que se guarde en la base de datos
  //Como lleva tiempo le pongo await y luego sigue con el código
  await products.save();

  res.json({ status: "Product saved" });
});

//Para actualizar los datos
router.put("/:id", async (req, res) => {
  const { name, price } = req.body;
  const newProducts= { name, price };
  await Products.findByIdAndUpdate(req.params.id, newProducts);
  res.json({ status: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  await Products.findByIdAndRemove(req.params.id);
  res.json({ status: "Product deleted" });
});

module.exports = router;
