import { Button, Grid, Typography } from '@material-ui/core'
import {useForm, FormProvider} from "react-hook-form";
import { Link } from 'react-router-dom';
import AddressInput from './AddressInput';

const AddressForm = () => {
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
            <AddressInput required name="firstName" label="First Name" />
            <AddressInput required name="lastName" label="Last Name" />
            <AddressInput required name="address1" label="Address" />
            <AddressInput required name="email" label="Email address" />
            <AddressInput required name="city" label="City" />
            <AddressInput required name="postCode" label="Post Code " />
          </Grid>

          <div style={{display: "flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
            <Button
              component={Link}
              to="/shoppingcart"
              variant="contained"
              color="primary"
            >
              Back to shopping cart
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm