// Footer.js
import { Toolbar, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#567a51",
        padding: "8px 0",
        marginTop: "64px",
        bottom: 0,
        position: "absolute",
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography variant="body1" style={{ color: "#f9f9f9" }}>
          &copy; 2024 Tu Empresa. Todos los derechos reservados.
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <div>
          <IconButton
            edge="end"
            aria-label="facebook"
            sx={{ marginRight: "8px", color: "#f9f9f9" }}
            href="https://www.facebook.com"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="twitter"
            sx={{ marginRight: "8px", color: "#f9f9f9" }}
            href="https://www.twitter.com"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="instagram"
            sx={{ marginRight: "8px", color: "#f9f9f9" }}
            href="https://www.instagram.com"
            target="_blank"
          >
            <Instagram />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="linkedin"
            sx={{ marginRight: "8px", color: "#f9f9f9" }}
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
