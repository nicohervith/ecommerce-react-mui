import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AddShoppingCart,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import accounting from "accounting";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MySwal = withReactContent(Swal);

export default function Product({ product }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const {
    _id: id,
    name,
    productType,
    rating,
    image,
    price,
    description,
    inStock,
  } = product;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleExpandClick = () => setExpanded(!expanded);

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        productType,
        rating,
        image,
        price,
        description,
        inStock,
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
        const response = await fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto se ha eliminado correctamente.",
          });
          navigate("/");
        } else {
          MySwal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Hubo un problema al eliminar el producto.",
          });
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
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            {accounting.formatMoney(price, "USD $")}
          </Typography>
        }
        title={name}
        subheader={inStock ? "In stock" : "Out of stock"}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productType}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            aria-label="Add to Cart"
            onClick={addToBasket}
            disabled={!inStock}
          >
            <AddShoppingCart fontSize="large" />
          </IconButton>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i} style={{ fontSize: "20px" }}>
                &#11088;
              </p>
            ))}
        </Box>

        {user?.role.includes("admin") && (
          <>
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
          </>
        )}

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
