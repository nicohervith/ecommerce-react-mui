import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const ProductList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          width: "90%",
          mx: "auto",
          pt: "90px",
          alignSelf: "flex-start",
        }}
      >
        <Grid container spacing={3} alignItems="stretch">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductList;
