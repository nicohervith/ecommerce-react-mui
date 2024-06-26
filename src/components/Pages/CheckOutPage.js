import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import CheckOutCard from "./CheckOutCard";
import Total from "./Total";
import Navbar from "./navbar/Navbar";
//import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem",
  },
  mainCart: {
    paddingTop: "60px",
  },
}));

const CheckOutPage = () => {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();

  function FormRow() {
    return (
      <React.Fragment>
        {basket?.map((item) => (
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <CheckOutCard key={item.id} product={item} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container spacing={3} className={classes.mainCart}>
        <Grid item xs={12}>
          <Typography align="center" gutterBottom variant="h4">
            Carrito
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Typography>
            <Total />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOutPage;
