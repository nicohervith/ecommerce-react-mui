import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { useStateValue } from "../../StateProvider";
import CheckOutCard from "./CheckOutCard";
import Total from "./Total";
import Navbar from "./navbar/Navbar";
//import { Link } from "react-router-dom";

const CheckOutPage = () => {
  const [{ basket }, dispatch] = useStateValue();

  function FormRow() {
    return (
      <React.Fragment>
        {basket?.map((item) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={item.id}>
            <CheckOutCard product={item} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div style={{ flexGrow: 1, padding: "2rem" }}>
      <Navbar />
      <Grid container spacing={3} sx={{ paddingTop: "60px" }}>
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
