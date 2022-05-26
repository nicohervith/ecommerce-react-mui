import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingCart } from "@material-ui/icons";
import { Badge , Button} from "@material-ui/core";

 import { grey } from "@material-ui/core/colors";
 import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { auth } from "../../../firebase";
import { actionTypes } from "../../../reducer";

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



 const useStyles = makeStyles((theme)=>({
   
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
 }));



export default function Navbar(props) {


   const classes = useStyles();
/*
    const [expanded, setExpanded] = React.useState(false);
*/
 const [{ basket,user }, dispatch] = useStateValue();
 const navigate = useNavigate();

const handleAuth = () =>{
  if (user){
    auth.signOut();
    dispatch({
      type: actionTypes.EMPTY_BASKET,
      basket: [],
    })
     dispatch({
       type: actionTypes.SET_USER,
       user: null,
     });
    navigate('/');
  }
}

  return (
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Link to="/" style={{ textDecoration: "none" }}>
                <IconButton
                  size="medium"
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
              </Link>

              <div className={classes.grow} />
              <Typography variant="h6" color="textPrimary" component="p">
                <b>Hello {user ? user.email : " Guest"}</b>
              </Typography>
              <div className={classes.button}>
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleAuth}
                    variant="outlined"
                    color="inherit"
                  >
                    <strong>{user ? " Sign Out" : " Sign In"}</strong>
                  </Button>
                </Link>

                <Link to="/shoppingcart">
                  <IconButton aria-label="show cart items" color="inherit">
                    <Badge badgeContent={basket?.length} color="secondary">
                      <ShoppingCart fontSize="large" color="inherit" />
                    </Badge>
                  </IconButton>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

  );
};

