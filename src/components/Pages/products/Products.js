import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

 import { grey } from "@material-ui/core/colors";
 import { makeStyles } from "@material-ui/core/styles";
import Product from "./Product";
import products from '../../../product-data'



 const useStyles = makeStyles((theme)=>({
   root: {
     flexGrow: 1,
     padding: theme.spacing(3),
   },
   
 }));

export default function Products() {

  const classes = useStyles();
  return (

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

  );
}
