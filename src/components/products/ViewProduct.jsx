import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Box,
  CircularProgress,
  Link as LinkMui,
  Button,
  Snackbar,
  Chip,
  useMediaQuery,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/IconButton";
import { ProductsStore } from "./ProductsContext";
import { useAuth } from "../contexts/AuthContext";

const ViewProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();
  const context = useContext(ProductsStore);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
  }, [context.products]);

  const getProduct = async () => {
    setLoading(true);
    if (context.products.length > 0 && id) {
      let prod = context.products.filter((elem) => {
        return elem.id === +id;
      });
      setLoading(false);
      setProduct(...prod);
    } else {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products/" + id
        );
        setLoading(false);
        setProduct({ ...response.data, cart: 1 });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
  };
  const addToCart = ( ) => {
    setOpen(true);
    context.ProductUtils.updateCart(
      "change",
      product,
      context.cart,
      context.updateCartItems,
      user?.uid
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const redirect = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1,{ replace:true});
    } else {
      navigate("/", { replace: true });
    }
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
      {error ? (
        <h2>{error.message}. Please try again</h2>
      ) : (
        <>
            <Button onClick={redirect}>Go back</Button>
          {loading ? (
            <div className="spinner">
              <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <>
              <Card
                sx={{
                  width: "auto",
                  paddingTop: "3vh",
                  position: "static",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <CardHeader
                  title={product?.title}
                  subheader={
                    <Chip
                      sx={{ backgroundColor: "yellow", fontSize: 20 }}
                      label={`$ ${product?.price}`}
                    />
                  }
                  sx={{ fontSize: 35, padding: "3px" }}
                ></CardHeader>
                <div style={{ display: "flex", flexWrap: "wrap", margin: "0" }}>
                  {product.images?.map((image) => {
                    return (
                      <CardMedia
                        component="img"
                        sx={{
                          width: isMobile ? "45vh" : "55vh",
                          height: "auto",
                        }}
                        image={image}
                      />
                    );
                  })}
                </div>

                {/* <div style={{ display: "flex" }}> */}
                <CardContent sx={{}}>
                  <Typography variant="body1" color="text.secondary">
                    {product?.description}
                  </Typography>
                </CardContent>
                <div style={{ textAlign: "center" }}>
                  <CardContent>
                    <Button
                      onClick={() => {
                        context.ProductUtils.updateCount(
                          "minus",
                          product,
                          context.products,
                          context.updateProducts
                        );
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    {product?.cart}
                    <Button
                      onClick={() => {
                        context.ProductUtils.updateCount(
                          "add",
                          product,
                          context.products,
                          context.updateProducts
                        );
                      }}
                    >
                      <AddIcon />
                    </Button>
                    <Button
                      sx={{ margin: "4px" }}
                      aria-label="add to cart"
                      onClick={() => {
                        addToCart();
                      }}
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      disabled={!user}
                    >
                      Add to cart
                    </Button>
                    <br />
                    {!user ? (
                      <Alert severity="info">
                        {"Login to add products to cart"}
                      </Alert>
                    ) : null}
                    {context.ProductUtils.productInCart(product, context?.cart)? (
                      <Button
                        sx={{ margin: "2px" }}
                        color="error"
                        aria-label="Remove from cart"
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "remove",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user?.uid
                          );
                        }}
                        variant="outlined"
                        startIcon={<RemoveShoppingCartIcon color="error" />}
                      >
                        Remove from cart
                      </Button>
                    ) : null}
                    <IconButton aria-label="share">
                      <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="Product added to cart!"
                        action={action}
                      />
                    </IconButton>
                  </CardContent>
                </div>
                {/* </div> */}
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewProduct;
