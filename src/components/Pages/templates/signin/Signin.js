import React, { useState } from "react";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { jwtDecode } from "jwt-decode";

import { useStateValue } from "../../../../StateProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loadingContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignIn() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const classes = useStyles();
  const [{}, dispatch] = useStateValue();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en el localStorage
        localStorage.setItem("token", data.token);

        // Decodificar el token para obtener la información del usuario
        const user = jwtDecode(data.token);

        // Actualizar el estado global con la información del usuario
        dispatch({
          type: "SET_USER",
          user: user,
        });

        setLoading(false);
        navigate("/");
      } else {
        setError(data.message || "Error en usuario o contraseña");
        setLoading(false);
      }
    } catch (error) {
      setError("Error en la solicitud");
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <IconButton
          onClick={() => navigate("/")}
          style={{ alignSelf: "flex-start" }}
        >
          <ArrowBackIcon />
          <p>Volver</p>
        </IconButton>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Sign In
            </Button>
            <div className={classes.loadingContainer}>
              {loading && <CircularProgress style={{ marginTop: "20px" }} />}
              {success && (
                <Alert severity="success" style={{ marginTop: "20px" }}>
                  Usuario logueado con éxito! Redirigiendo...
                </Alert>
              )}
              {error && (
                <Alert severity="error" style={{ marginTop: "20px" }}>
                  {error}
                </Alert>
              )}
            </div>
            <Grid container>
              <Grid item xs>
                <RouteLink to="/forgot-password" variant="body2">
                  Forgot password?
                </RouteLink>
              </Grid>
              <Grid item>
                <RouteLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouteLink>
              </Grid>
            </Grid>
          </form>
        </div>
        {/*   <Box mt={8}>
          <Copyright />
        </Box> */}
      </Container>
    </div>
  );
}
