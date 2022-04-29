
import React from 'react'
import accounting from 'accounting'
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

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
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <h5>Total items: 3</h5>
        <h5>{accounting.formatMoney(50, "€")}
        </h5>
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