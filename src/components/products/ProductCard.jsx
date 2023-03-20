import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  Link as LinkMui,
  useMediaQuery,
  Chip,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import { ProductsStore } from "./ProductsContext";
import CloseIcon from "@mui/material/IconButton";

const ProductCard = ({ prod }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { ProductUtils, cart, updateCartItems } = useContext(ProductsStore);
  const addToCart = () => {
    setOpen(true);
    ProductUtils.updateCart(
      "change",
      prod,
      cart,
      updateCartItems,
      user?.uid
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Card
        sx={{
          width: isMobile ? "40vh" : "32vh",
          borderWidth: "2px",
          borderStyle: "solid",
          margin: "5px",
          borderRadius: "3vh",
          borderColor: "white",
          ":hover": { backgroundColor: "rgb(244, 240, 193)" }, marginBottom:"4vh"
          // height:'60vh'
        }}
      >
        <CardHeader
          sx={{  backgroundColor: "rgb(204, 207, 147)", color: "black", textAlign:"center" }}
          title={
            <Typography sx={{
              ":hover": { cursor: "pointer" },
              fontSize: isMobile ? 14 : 14,
              fontFamily:"sans-serif"

            }} variant="h5" >
              {prod.title}
            </Typography>
          }
          onClick={() => {
            navigate(`/product/${prod.id}`);
          }}
        ></CardHeader>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <CardMedia
            sx={{ width: "full", marginRight: "auto", marginLeft: "auto" }}
            component="img"
            alt={`${prod.title}`}
            height="250px"
            image={prod.images[0]}
          />
          <CardActions sx={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>

            <div
            style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', textAlign:"center",justifyItems:"center"}}
            >
              <Chip
                sx={{
                  backgroundColor: "yellow",
                  fontSize: 12,
                  // marginLeft: "none",
                  // marginTop: "4px",
                }}
                label={`$ ${Number(prod.price).toFixed(2)}`}
              />
              <Button
                size="small"
                sx={{
                  // marginTop: "2px",
                  marginLeft: "1vh",
                  fontSize:11
                }}
                aria-label="add to cart"
                onClick={() => { return addToCart() }}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                disabled={!user}
              >
                Add to cart
              </Button>
            </div>
          </CardActions>
        </div>
        <IconButton aria-label="share">
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Product added to cart!"
            action={action}
          />
        </IconButton>
      </Card>
    </>
  );
};

export default ProductCard;
