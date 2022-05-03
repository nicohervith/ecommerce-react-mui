
import React from 'react'
import accounting from 'accounting'
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {getBasketTotal} from "../../reducer";
import { useStateValue } from "../../StateProvider";

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#f44336",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
  },
  button: {
    marginTop: "2rem",
  },
}));

const Total = () => {
  const classes = useStyles();
   const [{ basket }, dispatch] = useStateValue();
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <h2>Total items: {basket?.length}</h2>
        <h2>{accounting.formatMoney(getBasketTotal(basket), "€")}</h2>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Check out
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default Total;