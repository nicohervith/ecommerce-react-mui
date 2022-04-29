import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import products from "../product-data";

/*import {useStateValue} from "../StateProvider";*/

import CheckOutCard from './CheckOutCard';
/*import Total from "./Total";*/
import Product from "./Product";
import Total from "./Total";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[200],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#f44336",
    },
  },
});

const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
    padding:"2rem",
    
  },
}));


const CheckOutPage = () => {
     const classes = useStyles();
    /* const[{basket},dispatch]=useStateValue();
*/
     function FormRow(){
       return (
          <React.Fragment>
                {products?.map((item)=>(
                  <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckOutCard key={item.id} product={item}/>
                  </Grid>
                ))}
          </React.Fragment>  
  )
}

return (
  <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" gutterBottom variant="h4">
            Shopping Cart
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Typography>
            <Total/>
          </Typography>
        </Grid>
      </Grid>
    </div>
  </ThemeProvider>
);
}

export default CheckOutPage
