import { Grid, TextField } from "@material-ui/core";
import { useFormContext , Controller } from "react-hook-form"

const AddressInput = ({name,label,required}) => {

  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      {/*Le indico a controller que se comporte como un TextField que funciona como un INPUT  */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            fullWidth
            value={value}
            label={label}
            required={required}
          />
        )}
      />
    </Grid>
  );
}

export default AddressInput;