//Back-end
const express = require("express");
const Stripe= require("stripe");
const morgan = require("morgan");
const { mongoose } = require("./database");

//Doy permiso para recuperar los datos en este caso de localhost
const cors = require("cors")

//Llave privada de stripe
const stripe = new Stripe(
  "sk_test_51LAIJWIlL7CBuxtZLw6cfpiSgnSFZr6mAcf3enu3d68WecgUflMaJQIC9z0rtNyon4EAFsfhkNtM8EcQS758pg6a00G3apDEpv"
);


//Inicializo express
const app = express();

//Routes
app.use("/api/checkout", require("../routes/checkout.routes"));

//middleware
//Le doy permiso para que el servidor pueda aceptar los datos de origen desde el sitio indicado
app.use(cors({origin: "https://localhost:3000"}));
app.use(morgan("dev"));
app.use(express.json());

app.post("/api/checkout", async(req,res)=>{
  console.log(req.body)
  const { id, amount } = req.body;

  try{

    const payment = await stripe.paymentIntents.create({
      amount, 
      currency: "USD $",
      description:"Basket of products",
      confirm: true,
    })
    console.log(payment)
    return res.status(200).json({message: "Succesful payment"})
  }
  catch(error){
    //Envío el tipo de error al front
    return res.json({message: error.raw.message})
    //console.log(error)
  }
})

app.listen(3001, ()=> console.log("Server listening port ", 3001))
//En consola --> node server/index.js Para corroborar que si escucha al servidor
