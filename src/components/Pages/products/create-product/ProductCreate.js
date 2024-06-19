import React, { useState } from "react";
import { useStateValue } from "../../../../StateProvider";

const ProductCreate = () => {
  const [{ user }] = useStateValue();
  console.log(" create product", user);
  const [formData, setFormData] = useState({
    imgUrl: "",
    name: "",
    description: "",
    price: "",
    tags: "",
  });

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
      const response = await fetch(
        "http://localhost:4000/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Producto creado:", data);
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="imgUrl"
        placeholder="URL de la imagen"
        value={formData.imgUrl}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre del producto"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción del producto"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tags"
        placeholder="Etiquetas (separadas por comas)"
        value={formData.tags}
        onChange={handleChange}
      />
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductCreate;
