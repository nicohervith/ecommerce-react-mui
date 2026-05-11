import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import axios from "axios";
import accounting from "accounting";

const MySwal = withReactContent(Swal);

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    productType: "",
    rating: "",
    description: "",
    price: "",
    tags: "",
    inStock: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/${productId}`);
        if (response.status === 200) {
          const {
            image,
            name,
            productType,
            rating,
            description,
            price,
            tags,
            inStock,
          } = response.data;
          setFormData({
            image,
            name,
            productType,
            rating,
            description,
            price,
            tags: tags.join(", "),
            inStock,
          });
        } else {
          console.error("Error al obtener el producto:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProduct();
  }, [productId, apiUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "rating") {
      setFormData({
        ...formData,
        [name]: Math.max(0, Math.min(5, Number(value))),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
          `${apiUrl}/products/${productId}`,
          updatedProduct,
        );
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "¡Producto actualizado!",
            text: "El producto se ha actualizado correctamente.",
          });
          navigate("/");
        } else {
          MySwal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Hubo un problema al actualizar el producto.",
          });
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        MySwal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Hubo un problema al actualizar el producto.",
        });
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 705, height: "100%", margin: "auto" }} elevation={0}>
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            margin: "auto",
            padding: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <CardHeader
            action={
              <Typography variant="h6" color="text.secondary">
                {accounting.formatMoney(formData.price, "USD $")}
              </Typography>
            }
            title={formData.name}
            subheader={formData.inStock ? "In stock" : "Out of stock"}
          />
          <CardMedia
            component="img"
            height="194"
            image={formData.image}
            alt={formData.name}
          />
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
              type="text"
              name="productType"
              label="Tipo de producto"
              fullWidth
              value={formData.productType}
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
              type="number"
              name="rating"
              label="Rating"
              fullWidth
              value={formData.rating}
              onChange={handleChange}
              margin="normal"
              slotProps={{ input: { min: 0, max: 5 } }}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inStock}
                  onChange={handleChange}
                  name="inStock"
                  color="primary"
                />
              }
              label="En stock"
            />
            <Button type="submit" variant="contained" color="primary">
              Actualizar Producto
            </Button>
          </CardContent>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpdateProduct;
