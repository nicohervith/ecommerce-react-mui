import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'
import Review from './Review'
import {Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import {accounting} from 'accounting';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { Link } from "react-router-dom";
import axios from "axios"

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

  const [{ basket }, dispatch] = useStateValue();
  
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
        }
      );
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
           console.log(data);
        }
        catch(error){console.log(error)}
        
        //Información que envio al backend
     
        //Para ver lo que envio al backend
       
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
          disabled={false}
          type="submit"
          variant="contained"
          color="primary"
        >
          {accounting.formatMoney(getBasketTotal(basket), "USD $")}
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