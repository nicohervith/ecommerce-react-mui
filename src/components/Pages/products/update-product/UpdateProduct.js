import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Collapse,
  TextField,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import accounting from "accounting";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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

const UpdateProduct = () => {
  const { productId } = useParams();
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    productType: "",
    description: "",
    price: "",
    tags: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
        if (response.status === 200) {
          const { image, name, productType, description, price, tags } =
            response.data;
          setFormData({ image, name, productType, description, price, tags });
        } else {
          console.error("Error al obtener el producto:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${productId}`,
        formData
      );
      if (response.status === 200) {
        console.log("Producto actualizado:", response.data);
        // Manejar la redirección o cualquier otra acción después de la actualización
      } else {
        console.error("Error al actualizar el producto:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} elevation={0}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CardHeader
          action={
            <Typography variant="h6" color="textSecondary">
              {accounting.formatMoney(formData.price, "USD $")}
            </Typography>
          }
          title={formData.name}
          subheader="in stock"
        />
        <CardMedia
          className={classes.media}
          image={formData.image}
          title={formData.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {formData.productType}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{formData.description}</Typography>
          </CardContent>
        </Collapse>

        <CardContent>
          <TextField
            type="text"
            name="image"
            label="URL de la imagen"
            fullWidth
            value={formData.image}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            type="text"
            name="name"
            label="Nombre del producto"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="description"
            label="Descripción del producto"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            type="text"
            name="price"
            label="Precio"
            fullWidth
            value={formData.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            type="text"
            name="tags"
            label="Etiquetas (separadas por comas)"
            fullWidth
            value={formData.tags}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Actualizar Producto
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default UpdateProduct;
