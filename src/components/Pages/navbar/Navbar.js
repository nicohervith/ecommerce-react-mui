import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  InputBase,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link, Link as RouteLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { Person, SearchOutlined, ShoppingCart } from "@mui/icons-material";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ basket, user }, dispatch] = useStateValue();
  const [categoryEl, setCategoryEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
  };

  const handleCategoryClose = () => {
    setCategoryEl(null);
  };

  const handleCategorySelect = (category) => {
    /* navigate(`/category/${category}`); */
    handleCategoryClose();
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div style={{ flexGrow: 1, marginBottom: "4rem" }} position="fixed">
      <AppBar sx={{ backgroundColor: "#fbfbfb" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            fontSize="large"
            onClick={() => navigate("/")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.png/50px-Logo_TV_2015.png"
              alt="logo"
              style={{ width: 40, height: "auto" }}
            />
          </IconButton>

          <Box
            sx={{
              position: "relative",
              borderRadius: "6px",
              background: "#ededed",
              backgroundColor: alpha("#ffffff", 0.15),
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.25),
              },
              marginRight: "16px",
              marginLeft: 0,
              width: "100%",
              "@media (min-width: 600px)": {
                marginLeft: "24px",
                width: "auto",
              },
            }}
          >
            <Box
              sx={{
                padding: "0 16px",
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "black",
              }}
            >
              <SearchOutlined />
            </Box>
            <InputBase
              placeholder="Buscar…"
              sx={{
                "& .MuiInputBase-input": {
                  padding: "8px 8px 8px 0",
                  paddingLeft: "calc(1em + 32px)",
                  transition: "width 300ms",
                  width: "100%",
                  "@media (min-width: 600px)": {
                    width: "12ch",
                    "&:focus": {
                      width: "20ch",
                    },
                  },
                },
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Box>

          <div style={{ flexGrow: 1 }} />
          <div>
            <IconButton
              aria-label="show cart items"
              color="inherit"
              onClick={() => navigate("/shoppingcart")}
            >
              <Badge badgeContent={basket?.length} color="secondary">
                <ShoppingCart fontSize="large" color="primary" />
              </Badge>
            </IconButton>
          </div>

          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                color: "#0000008a",
                alignItems: "center",
                fontSize: "1.2rem",
              }}
            >
              <IconButton
                edge="end"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={!user ? handleSignIn : handleMenuOpen}
                style={{ marginRight: "2px" }}
              >
                <Person fontSize="large" />
              </IconButton>
              {!user && (
                <Typography
                  variant="body1"
                  sx={{ cursor: "pointer" }}
                  onClick={handleSignIn}
                >
                  Acceder
                </Typography>
              )}
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user ? (
                <>
                  {user.role.includes("admin") && (
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        to="/product-create"
                        style={{ textDecoration: "none" }}
                      >
                        Subir artículo
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleSignIn}>Iniciar sesión</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
        <Toolbar
          sx={{
            backgroundColor: "#567a51",
            boxShadow: "none",
            minHeight: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "70%",
              margin: "auto",
            }}
          >
            {[
              { label: "Tecnología", value: "tecnología" },
              { label: "Vestimenta", value: "vestimenta" },
              { label: "Artículos de hogar", value: "artículos de hogar" },
              { label: "Artículos de mascotas", value: "mascotas" },
            ].map(({ label, value }) => (
              <Box
                key={value}
                sx={{ color: "#f9f9f9", margin: "auto", cursor: "pointer" }}
                onClick={() => handleCategorySelect(value)}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
