import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "90%",
    margin: "auto",
    paddingTop: "90px",
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

     {/*  <div className={classes.carouselContainer}>
        <Slider {...settings}>
          <div>
            <img
              src="https://via.placeholder.com/1200x400?text=Oferta+1"
              alt="Oferta 1"
              className={classes.carouselImage}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/1200x400?text=Oferta+2"
              alt="Oferta 2"
              className={classes.carouselImage}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/1200x400?text=Oferta+3"
              alt="Oferta 3"
              className={classes.carouselImage}
            />
          </div>
        </Slider>
      </div> */}

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
      <Footer />
    </div>
  );
};

export default ProductList;
