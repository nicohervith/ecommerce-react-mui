import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
    maxWidth: 505,
    height: "100%",
    margin: "auto",
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
const MySwal = withReactContent(Swal);
const UpdateProduct = () => {
  const { productId } = useParams();

  const navigate = useNavigate();
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
          setFormData({
            image,
            name,
            productType,
            description,
            price,
            tags: tags.join(", "),
          });
        } else {
          console.error("Error al obtener el producto:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    console.log("productId useEffect:", productId);
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

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se actualizará el producto. Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const updatedProduct = {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        };
        const response = await axios.put(
          `http://localhost:4000/api/products/${productId}`,
          updatedProduct
        );
        if (response.status === 200) {
          // Mostrar SweetAlert de éxito
          MySwal.fire({
            icon: "success",
            title: "¡Producto actualizado!",
            text: "El producto se ha actualizado correctamente.",
          });
          navigate("/");
        } else {
          console.error("Error al actualizar el producto:", response.status);
          // Mostrar SweetAlert de error
          MySwal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Hubo un problema al actualizar el producto.",
          });
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        // Mostrar SweetAlert de error
        MySwal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Hubo un problema al actualizar el producto.",
        });
      }
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default UpdateProduct;
