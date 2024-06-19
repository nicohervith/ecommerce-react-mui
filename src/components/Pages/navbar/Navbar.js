import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Badge,
  Menu,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Link as RouteLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { Person, ShoppingCart } from "@material-ui/icons";
/* import { MenuIcon } from "@material-ui/icons"; */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
    height: "60px",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "5px",
  },
  ShoppingCartContainer: {
    marginRight: "5px",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ basket, user }, dispatch] = useStateValue();

  console.log("user", user);

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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.png/50px-Logo_TV_2015.png"
              alt="logo"
              style={{ width: 30, height: "auto" }}
            />
          </IconButton>

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
            <IconButton
              edge="end"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Person fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom", // Ajusta la posición inicial vertical
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top", // Ajusta cómo se transforma cuando se abre
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user && (
                <>
                  {user.role.includes("admin") && (
                    <MenuItem
                      onClick={() => {
                        // Acción para subir artículo
                        console.log("Subir artículo");
                      }}
                    >
                      Subir artículo
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      /* Acción para perfil */
                    }}
                  >
                    Perfil
                  </MenuItem>
                </>
              )}
              {user ? (
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              ) : (
                <MenuItem onClick={handleSignIn}>Iniciar sesión</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
