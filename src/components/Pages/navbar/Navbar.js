import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  InputBase,
} from "@material-ui/core";
import { alpha, makeStyles, styled } from "@material-ui/core/styles";
import { Link, Link as RouteLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { Person, SearchOutlined, ShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4rem",
  },
  appBarMain: {
    backgroundColor: "#fbfbfb",
  },

  appBar: {
    backgroundColor: "#567a51",
    boxShadow: "none",
    minHeight: "50px",
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
  categories: {
    color: "black",
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
    margin: "auto",
  },
  category: {
    color: "#f9f9f9",
    margin: "auto",
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: "6px",
    background: "#ededed",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    border: "1px solid #cfcfcf",
    borderRadius: "6px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  accessContainer: {
    display: "flex",
    flexDirection: "row",
    color: "#0000008a",
    alignItems: "center",
    fontSize: "1.2rem",
  },
  loginText: {
    cursor: "pointer",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ basket, user }, dispatch] = useStateValue();
  const [categoryEl, setCategoryEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className={classes.root} position="fixed">
      <AppBar className={classes.appBarMain}>
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

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchOutlined />
            </div>
            <InputBase
              placeholder="Buscar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>

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
            <div className={classes.accessContainer}>
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
                  className={classes.loginText}
                  onClick={handleSignIn}
                >
                  Acceder
                </Typography>
              )}
            </div>
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
        <Toolbar className={classes.appBar}>
          <div className={classes.categoriesContainer}>
            <div
              className={classes.category}
              onClick={() => handleCategorySelect("tecnología")}
            >
              Tecnología
            </div>
            <div
              className={classes.category}
              onClick={() => handleCategorySelect("vestimenta")}
            >
              Vestimenta
            </div>
            <div
              className={classes.category}
              onClick={() => handleCategorySelect("artículos de hogar")}
            >
              Artículos de hogar
            </div>
            <div
              className={classes.category}
              onClick={() => handleCategorySelect("mascotas")}
            >
              Artículos de mascotas
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
