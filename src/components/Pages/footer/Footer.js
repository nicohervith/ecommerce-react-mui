// Footer.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, IconButton } from "@material-ui/core";
import { Facebook, Twitter, Instagram, LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#567a51",
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(8),
  },
  grow: {
    flexGrow: 1,
  },
  socialIcons: {
    marginRight: theme.spacing(1),
    color: "#f9f9f9",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Toolbar>
        <Typography variant="body1" style={{ color: "#f9f9f9" }}>
          &copy; 2024 Tu Empresa. Todos los derechos reservados.
        </Typography>
        <div className={classes.grow} />
        <div>
          <IconButton
            edge="end"
            aria-label="facebook"
            className={classes.socialIcons}
            href="https://www.facebook.com"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="twitter"
            className={classes.socialIcons}
            href="https://www.twitter.com"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="instagram"
            className={classes.socialIcons}
            href="https://www.instagram.com"
            target="_blank"
          >
            <Instagram />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="linkedin"
            className={classes.socialIcons}
            href="https://www.linkedin.com"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
        </div>
      </Toolbar>
    </footer>
  );
};

export default Footer;
