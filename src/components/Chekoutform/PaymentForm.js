import {
  Button,
  CircularProgress,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import Review from "./Review";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import accounting from "accounting";
import { actionTypes, getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import stripePromise from "../../constants/stripeConfig";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({ nextStep }) => {
  const [{ basket }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        const response = await axios.post(`${apiUrl}/checkout`, {
          id,
          amount: getBasketTotal(basket) * 100,
          products: basket.map(({ name, price }) => ({ name, price })),
        });

        if (response.data.status === "Successful payment") {
          dispatch({ type: actionTypes.EMPTY_BASKET, basket: [] });
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment was processed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Payment Failed",
            text: response.data.message || "Payment failed",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Payment Error",
          text: "There was an error processing your payment. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        title: "Payment Error",
        text: "There was an error processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
      nextStep();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" component={Link} to="/shoppingcart">
          Back
        </Button>
        <Button
          disabled={!stripe || loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            accounting.formatMoney(getBasketTotal(basket), "USD $")
          )}
        </Button>
      </Box>
    </Box>
  );
};

const PaymentForm = ({ nextStep, backStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ my: "20px" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
