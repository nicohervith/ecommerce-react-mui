import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useStateValue } from "../../../../StateProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbar from "../../navbar/Navbar";

const MySwal = withReactContent(Swal);

const ProductCreate = () => {
  const [{ user }] = useStateValue();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    productType: "",
    price: "",
    tags: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "¡Producto creado!",
          text: "El producto se ha creado correctamente.",
        });
        setFormData({
          image: "",
          name: "",
          productType: "",
          description: "",
          price: "",
          tags: "",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Hubo un problema al crear el producto.",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      MySwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al crear el producto.",
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Card elevation={0} sx={{ pt: "70px", boxShadow: "none" }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              margin: "auto",
              padding: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <TextField
              type="text"
              name="image"
              label="URL de la imagen"
              variant="outlined"
              value={formData.image}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              name="name"
              label="Nombre del producto"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              name="productType"
              label="Tipo de producto"
              variant="outlined"
              value={formData.productType}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Descripción del producto"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              type="text"
              name="price"
              label="Precio"
              variant="outlined"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              name="tags"
              label="Etiquetas (separadas por comas)"
              variant="outlined"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-end" }}
            >
              Crear Producto
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCreate;
