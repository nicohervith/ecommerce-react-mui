import { Divider, Typography } from '@material-ui/core'
import React from 'react'
import Review from './Review'
import {Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  "pk_test_51LAIJWIlL7CBuxtZcmAPD1sA5suFZEldPhSnwUIeq7COSXRCTuz4V19Yhp1Ziqy202co2iWzqg3jnft25AzK23dV00IAPmkVVO"
);

const CARD_ELEMENT_OPTIONS = {
  iconSTyle: "solid",
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

}

const CheckoutForm = ({ nextStep, backStep }) => {
  return (
    <form>
      <CardElement options ={CARD_ELEMENT_OPTIONS}/>
  </form>
  )
  
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