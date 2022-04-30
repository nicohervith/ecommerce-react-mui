import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
 import { createTheme, ThemeProvider } from "@mui/material/styles";
 import { grey } from "@mui/material/colors";
 import { makeStyles } from "@mui/styles";
import Product from "./Product";
import products from '../product-data'


 const theme = createTheme({
   palette: {
     primary: {
       // Purple and green play nicely together.
       main: grey[400],
     },
     secondary: {
       // This is green.A700 as hex.
       main: "#f44336",
     },
   },
 });

 const useStyles = makeStyles({
   root: {
     flexGrow: 1,
     padding: theme.spacing(3),
   },
   
 });

export default function Products() {

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {
              //Mapeo para iterar entre cada producto
              products.map((product)=>(
                 <Grid item xs={12} sm={6} md={4} lg={3}>
                   <Product key={product.id} product={product}/>
                 </Grid>
                  ))
            }
            
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
