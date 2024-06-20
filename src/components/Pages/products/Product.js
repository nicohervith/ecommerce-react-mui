import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import accounting from "accounting";
import {
  AddShoppingCart,
  DeleteOutline,
  EditOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
import { Link, useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),

  action: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const useStyles = makeStyles((theme) => ({
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
}));

const MySwal = withReactContent(Swal);

export default function Product({ product }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const [{ basket }, dispatch] = useStateValue();
  const {
    _id: id,
    name,
    productType,
    image,
    price,
    rating,
    description,
  } = product;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log("data", data);
        } else {
          console.error("Error al obtener productos:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        productType,
        image,
        price,
        rating,
        description,
      },
    });
  };

  const handleDelete = async () => {
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción es irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:4000/api/products/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error al eliminar el producto:", response.status);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        action={
          <Typography
            className={classes.action}
            variant="h6"
            color="textSecondary"
          >
            {accounting.formatMoney(price, "USD $")}
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
        <IconButton aria-label="Add to Cart" onClick={addToBasket}>
          <AddShoppingCart fontSize="large" />
        </IconButton>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>&#11088;</p>
          ))}

        <IconButton
          aria-label="Editar producto"
          component={Link}
          to={`/editar-producto/${id}`}
        >
          <EditOutlined />
        </IconButton>

        <IconButton aria-label="Delete Product" onClick={handleDelete}>
          <DeleteOutline fontSize="large" />
        </IconButton>

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
  );
}
