import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import accounting from "accounting";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";



const useStyles = makeStyles((theme)=>({
  action: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  image: {
    marginRight: "10px",
    height: "auto",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  cardRating: {
    display:"flex",
  },
}));

export default function CheckOutCard({
  product: { id, name, productType, image, price, rating, description },
}) {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();

  
  const removeItem=()=> dispatch
    ({
      type:actionTypes.REMOVE_ITEM,
      id,
    })
  

  return (
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardHeader
          action={
            <Typography
              className={classes.action}
              variant="h5"
              color="textSecondary"
            >
              {accounting.formatMoney(price, "USD $")}
            </Typography>
          }
          title={name}
          subheader="in stock"
        />
        <CardMedia className={classes.media} image={image} title={name} />

        <CardActions disableSpacing className={classes.cardActions}>
          <div className={classes.cardRating}>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>&#11088;</p>
              ))}
          </div>
          <IconButton>
            <DeleteIcon fontSize="large" onClick={removeItem} />
          </IconButton>
        </CardActions>
      </Card>
  );
}
