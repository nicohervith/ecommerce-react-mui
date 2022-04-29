import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import accounting from "accounting";
import { AddShoppingCart } from "@mui/icons-material";

 import { createTheme, ThemeProvider } from "@mui/material/styles";
 import { grey } from "@mui/material/colors";
 import { makeStyles } from "@mui/styles";
import { CardMedia } from "@mui/material";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),

action:{
  marginTop: '1rem',
},
media:{
  height:0,
  paddingTop: "56.25%",
},
expand:{
  transform:"rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform",{
    duration: theme.transitions.duration.shortest,
  })
},
expandOpen:{
  transform:"rotate(180deg)",
},


}));

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


const useStyles = makeStyles({
  action: {
    marginTop:"1rem",
  },
  media: {
    height:0,
    paddingTop:"56.25%"
  },
  image: {
    marginRight: "10px",
    height:"auto"
  },
});

export default function Product({product:{id,name,productType,image,price,rating,description}}) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <Card sx={{ maxWidth: 345, height: "100%" }}>
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
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {productType}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="Add to Cart" onClick="{addToBasket}">
            <AddShoppingCart fontSize="large" />
          </IconButton>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#11088;</p>
            ))}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}

