import { Button, CircularProgress, Divider, Typography } from '@material-ui/core'
import React from 'react'
import Review from './Review'
import {Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import {accounting} from 'accounting';
import { actionTypes, getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from 'react';

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
      "::placeholder":{
        color: "#ccc",
      },
    },
    invalid:{
      color: "#e5424d",
      ":focus":{
        color: "#303238",
      }
    }
  }

};

// "Test card number" de stripe para validar los form

const CheckoutForm = ({ nextStep, backStep }) => {

  const [{ basket , paymentMessage }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();

    const handleSubmit = async(e) => {
      //Para que el formulario no se refresque
      e.preventDefault();
      //El hook de stripe me permite acceder al createPaymentMethod
      const { error, paymentMethod } = await stripe.createPaymentMethod(
        //Creo un metodo de pago e indico que el pago va a ser por tarjeta
        {
          type: "card",
          card: elements.getElement(CardElement),
        });

        setLoading(true);

      //Utilizo try and catch para gestionar los errores
      if(!error){
        const { id } = paymentMethod;
        try{
          const { data } = await axios.post(
            "https://localhost:3001/api/checkout",
            {
              id,
              amount: getBasketTotal(basket) * 100,
            }
          );
          dispatch({
            type:actionTypes.SET_PAYMENT_MESSAGE,
            paymentMessage: data.message
          });

          dispatch({
            type: actionTypes.SET_PAYMENT_MESSAGE,
            paymentMessage: data.message,
          });

          if (data.message === "Succesful Payment"){
            //Si la compra es correcta, vacío el carrito
            dispatch({
              type:actionTypes.EMPTY_BASKET,
              basket: [ ],
            })
          }
           
           //Con esto limpio los datos de la tarjeta una vez utilizada
           elements.getElement(CardElement).clear();
           nextStep();
        }
        catch(error){
          console.log(error);
          nextStep();
        }

        setLoading(false);
        
      }
      //Para ver como guarda los datos el objeto paymentMethod
      console.log(paymentMethod);
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
          { loading ? (<CircularProgress/>)
          :
          (accounting.formatMoney(getBasketTotal(basket), "USD $"))}
        </Button>
      </div>
    </form>
  );
  
};

const PaymentForm = ({nextStep,backStep}) => {
  
  return (
    <>

      <Review/>
      <Divider/>
      <Typography variant="h6" gutterBottom style={{margin:"20px 0"}}>
            Payment method
      </Typography>


        {/*Elementos de stripe*/ }
      <Elements stripe={stripePromise}>
          <CheckoutForm backStep={backStep} nextStep={nextStep}/>
      </Elements>

      </>
  )
}

export default PaymentForm