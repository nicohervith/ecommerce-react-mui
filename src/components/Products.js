import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

 import { createTheme, ThemeProvider } from "@mui/material/styles";
 import { grey } from "@mui/material/colors";
 import { makeStyles } from "@mui/styles";
import Product from "./Product";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

 const theme = createTheme({
   palette: {
     primary: {
       // Purple and green play nicely together.
       main: grey[400],
     },
     secondary: {
       // This is green.A700 as hex.
       main: "#f44336",
     },
   },
 });

 const useStyles = makeStyles({
   root: {
     flexGrow: 1,
     marginBottom: "7rem",
     color: "whitesmoke",
   },
   
 });

export default function Products() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6}>
            <Product />
          </Grid>
          <Grid item xs={6} md={3}>
            <Product />
          </Grid>
          <Grid item xs={6} md={3}>
            <Product />
          </Grid>
          <Grid item xs={6} md={3}>
            <Product />
          </Grid>
          <Grid item xs={6} md={3}>
            <Product />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
