
import React from 'react'
import accounting from 'accounting'
import { Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import {getBasketTotal} from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Link } from 'react-router-dom';



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

      <div className={classes.root}>
        <h2>Total items: {basket?.length}</h2>
        <h2>{accounting.formatMoney(getBasketTotal(basket), "USD $")}</h2>

        <Link to="/checkout-page" style={{ textDecoration: "none" }}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Check out
          </Button>
        </Link>
      </div>

  );
}

export default Total;