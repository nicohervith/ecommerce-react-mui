import {
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useStateValue } from "../../StateProvider";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [{ paymentMessage }] = useStateValue();
  const steps = ["Shipping address", "Payment details"];

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const backStep = () => setActiveStep((prev) => prev - 1);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm backStep={backStep} nextStep={nextStep} />
    );

  return (
    <Box
      component="main"
      sx={{
        width: "auto",
        marginLeft: 2,
        marginRight: 2,
        // Equivalente a breakpoints.up(600 + spacing(2) * 2) → ~632px
        "@media (min-width: 632px)": {
          width: 600,
          marginLeft: "auto",
          marginRight: "auto",
        },
      }}
    >
      <Paper
        sx={{
          marginTop: 3,
          marginBottom: 3,
          padding: 2,
          "@media (min-width: 648px)": {
            marginTop: 6,
            marginBottom: 6,
            padding: 3,
          },
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ padding: "24px 0 40px" }}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Confirmation message={paymentMessage} />
        ) : (
          <Form />
        )}
      </Paper>
    </Box>
  );
};

export default Checkout;
