import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[400],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#f44336",
    },
  },
});

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


  /*
  const addToBasket=()=>{
    dispatch({
      type:actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        productType,
        image,
        price,
        rating,
        description,

      }
    })
  };*/

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 ,height:"100%"}}>
        <CardHeader
          action={
            <Typography
              className={classes.action}
              variant="h5"
              color="textSecondary"
            >
              {accounting.formatMoney(price, "€")}
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
              <DeleteIcon fontSize="large"/>
          </IconButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
