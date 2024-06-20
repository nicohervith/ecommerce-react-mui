import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log("data", data);
        } else {
          console.error("Error al obtener productos:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ProductList;
