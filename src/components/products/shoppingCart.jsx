import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Snackbar,
  Link as LinkMui,
  CircularProgress,
  Box,
  useMediaQuery,
  Chip,
  CssBaseline,
  AppBar,
  Toolbar
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ProductsStore } from "./ProductsContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
const ShoppingCart = () => {
  const [loadingCart, setLoadingCart] = useState(true);
  const context = useContext(ProductsStore);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:650px)");
  const totalPrice = useSelector((store)=> store.custom.totalPrice )
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentCart();
    context.ProductUtils.priceCounter(context.cart, updateTotalPrice);
  }, [user]);

 useEffect(() => {
  context.ProductUtils.priceCounter(context.cart, updateTotalPrice);
  }, [context.cart]);

  const updateTotalPrice = (total)=>{
    dispatch({
      type:"updateTotalPrice",
      payload:total
    })
  }

  const getCurrentCart = async () => {
    try {
      await context.ProductUtils.getCart(user?.uid,context.updateCartItems);
      setLoadingCart(false);
    } catch (error) {
     
      console.log(error);
      setLoadingCart(false);
    }
  };


  return (
    <>
    <Box sx={{ backgroundColor: "#1976d2" }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
        <Typography sx={{color:'white', margin:'2vh'}}>Total products in cart:{context.cartCount}</Typography>
        <Typography sx={{color:'white'}}>Total price:${Number(totalPrice).toFixed(2)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
      {loadingCart ? (
        <div className="spinner">
          <Box sx={{ justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          {context.cart && context.cart.length > 0 ? (
            context.cart?.map((product) => {
              return (
                <>
                  <Card
                    key={product.id}
                    sx={{
                     width: 'auto',
                      margin:'2vh'
                   
                    }}
                  >
                    <CardHeader
                      title={product.title}
                      subheader={ <Chip
                        sx={{ backgroundColor: "yellow", fontSize: 20 }}
                        label={`$ ${Number(product.price).toFixed(2)}`}
                      />}
                    ></CardHeader>
                    <div
                    style={{ display: "flex", flexwrap: "wrap", margin:'0', textAlign:'center' }}
                    >
                      {product?.images?.map((image)=>{
                        return(
                          <CardMedia
                          component="img"
                          sx={{ width: isMobile ? '15vh' : "25vh" }}
                          height="auto"
                          image={image}
                          alt={product?.title}
                        />
                        )
                      })
                      }               
                    </div>
                    <CardContent>
                        <CardHeader
                          subheader={product.description}
                          fontSize={10}
                          width="auto"
                          variant="subtitle2"
                          color="text.secondary"
                        ></CardHeader>
                      </CardContent>
                    <CardContent>
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "minus",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                      {product.cart}
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "add",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        color="error"
                        aria-label="Remove from cart"
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "remove",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                        variant="contained"
                        startIcon={<RemoveShoppingCartIcon color="action" />}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                  <CssBaseline/>
                </>
              );
            })
          ) : (
            <div style={{ marginTop: "20%", marginLeft: "25%" }} key={1}>
              <Card
                sx={{
                  maxWidth: 650,
                  paddingTop: "2vh",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  margin: "2vh",
                  borderRadius: "3vh",
                  borderColor: "white",
                }}
              >
                <CardHeader
                  sx={{ justifyContent: "center", alignContent: "center" }}
                  title="Cart is empty!!"
                  subheader="Add items to cart?"
                ></CardHeader>
                <LinkMui
                  sx={{ textDecoration: "none", marginLeft: "15px" }}
                  component={Link}
                  size="large"
                  to="/home"
                >
                  <Button variant="contained"> Go to Products</Button>
                </LinkMui>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ShoppingCart;
