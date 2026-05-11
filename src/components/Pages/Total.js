import React from "react";
import accounting from "accounting";
import { Button } from "@mui/material";
import { getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

const Total = () => {
  const [{ basket }] = useStateValue();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <h2>Total items: {basket?.length}</h2>
      <h2>{accounting.formatMoney(getBasketTotal(basket), "USD $")}</h2>

      <Link to="/checkout-page" style={{ textDecoration: "none" }}>
        <Button
          sx={{ marginTop: "2rem" }}
          variant="contained"
          color="secondary"
        >
          Check out
        </Button>
      </Link>
    </div>
  );
};

export default Total;
