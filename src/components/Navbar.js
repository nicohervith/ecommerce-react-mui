import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";

 import { createTheme, ThemeProvider } from "@mui/material/styles";
 import { grey } from "@mui/material/colors";
 import { makeStyles } from "@mui/styles";

/*
 const  useStyles = makeStyles((theme) =>({
   root:{
     flexGrow:1,
     marginBottom:"7rem",
   },
   appBar:{
    backgroundColor: "whitesmoke",
    boxShadow:"none",
   },
     grow: {
    flexGrow: 1,
  },
  image: {
    marginRight: "10px",
  },
 }));
*/

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
   appBar: {
     backgroundColor: "whitesmoke",
     boxShadow: "none",
   },
   grow: {
     flexGrow: 1,
   },
   button:{
     marginLeft:theme.spacing(2)
   },
   image: {
     marginRight: "10px",
   },
 });



export default function Navbar(props) {


   const classes = useStyles();
/*
    const [expanded, setExpanded] = React.useState(false);
*/
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.png/50px-Logo_TV_2015.png"
                  alt="logo"
                  className={classes.image}
                />
              </IconButton>

              <div className={classes.grow} />
              <Typography variant="h6" color="textPrimary" component="p">
                <b>Hello Guest</b>
              </Typography>
              <div className={classes.button}>
                <Button variant="outlined" color="inherit">
                    <strong>Sign In</strong>
                </Button>
                <IconButton aria-label="show cart items" color="inherit">
                  <Badge badgeContent={2} color="secondary">
                    <ShoppingCart fontSize="large" color="inherit" />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </ThemeProvider>
  );
};



/*
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  },),
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },

  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
  },
}));
*/