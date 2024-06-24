import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import Review from "./Review";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { accounting } from "accounting";
import { actionTypes, getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51LAIJWIlL7CBuxtZcmAPD1sA5suFZEldPhSnwUIeq7COSXRCTuz4V19Yhp1Ziqy202co2iWzqg3jnft25AzK23dV00IAPmkVVO"
);

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

const CheckoutForm = ({ nextStep, backStep }) => {
  const [{ basket }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const apiUrl = <process class="env REACT_APP_API_URL"></process>;

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
          products: basket.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        });

        const { data } = response;

        if (data.status === "Successful payment") {
          setPaymentMessage(data.message);
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          });

          Swal.fire({
            title: "Payment Successful",
            text: "Your payment was processed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          // Avanza al siguiente paso
          nextStep();
        } else {
          // Maneja otros mensajes de respuesta, si es necesario
          setPaymentMessage(data.message || "Payment failed");
          nextStep();
        }
      } else {
        console.log(error);
        Swal.fire({
          title: "Payment Error",
          text: "There was an error processing your payment. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        nextStep();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Payment Error",
        text: "There was an error processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      nextStep();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button variant="outlined" component={Link} to="/shoppingcart">
          Back
        </Button>
        <Button
          disabled={!stripe}
          type="submit"
          variant="contained"
          color="primary"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            accounting.formatMoney(getBasketTotal(basket), "USD $")
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm = ({ nextStep, backStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>

      {/*Elementos de stripe*/}
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
