import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useStateValue } from "../../../../StateProvider";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextField, Button } from "@material-ui/core";
import Navbar from "../../navbar/Navbar";

const useStyles = makeStyles((theme) => ({
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
  mainCard: {
    paddingTop: "70px",
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  button: {
    alignSelf: "flex-end",
  },
}));
const MySwal = withReactContent(Swal);
const ProductCreate = () => {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  console.log(user);

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
    console.log("token", token);
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
        const data = await response.json();
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
        console.error("Error al crear el producto");
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
    <div>
      <Navbar />
      <Card
        style={{ boxShadow: "none !important" }}
        elevation={0}
        className={classes.mainCard}
      >
        <CardContent>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              type="text"
              name="image"
              label="URL de la imagen"
              variant="outlined"
              value={formData.image}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.input}
              type="text"
              name="name"
              label="Nombre del producto"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.input}
              type="text"
              name="productType"
              label="Tipo de producto"
              variant="outlined"
              value={formData.productType}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.input}
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
              className={classes.input}
              type="text"
              name="price"
              label="Precio"
              variant="outlined"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.input}
              type="text"
              name="tags"
              label="Etiquetas (separadas por comas)"
              variant="outlined"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Crear Producto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCreate;
