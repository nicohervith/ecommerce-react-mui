import { Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Confirmation = ({ message }) => {
  return (
    <>
      <Typography variant="h6">{message}</Typography>
      <Divider />
      <Typography variant="subtitle2" gutterBottom>
        {message === "Succesful Payment" ? "" : ""}
      </Typography>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home Page
      </Button>
    </>
  );
};

export default Confirmation;
