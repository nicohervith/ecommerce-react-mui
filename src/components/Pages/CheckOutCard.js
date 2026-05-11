import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import { CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

export default function CheckOutCard({
  product: { id, name, productType, image, price, rating, description },
}) {
  const [{ basket }, dispatch] = useStateValue();

  const removeItem = () =>
    dispatch({
      type: actionTypes.REMOVE_ITEM,
      id,
    });

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        action={
          <Typography
            sx={{ marginTop: "1rem" }}
            variant="h5"
            color="textSecondary"
          >
            {accounting.formatMoney(price, "USD $")}
          </Typography>
        }
        title={name}
        subheader="in stock"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
      />

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div sx={{ display: "flex" }}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>&#11088;</p>
            ))}
        </div>
        <IconButton>
          <DeleteIcon fontSize="large" onClick={removeItem} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
