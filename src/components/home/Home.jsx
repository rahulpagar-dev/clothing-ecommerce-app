import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { uid } from "react-uid";
import { Box, CircularProgress,Button,Card, Container } from "@mui/material";
import ProductCard from "../products/ProductCard";
import Spinner from "../UI/Spinner";
import Pagination from "../UI/Pagination";
import SortingProducts from "../UI/SortingProducts";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [items, setPageItems] = useState([]);
  

  const [errorHandling, setErrorHandling] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products/"
      );
      let array = response.data.map((elem) => {
        return { ...elem, cart: 1 };
      });
      setproducts(array);
      setErrorHandling(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorHandling(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {errorHandling ? (
        <h1>404 Error. Try refreshing the page.</h1>
      ) : (
        <>
          {loading ? (
            <Spinner/>
          ) : (
            <>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
            <SortingProducts products={products} setProducts={setproducts}/>
            <Pagination items={products} setPageItems={setPageItems}/>
            </div>
           
             <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
              {items?.map((data, index) => {
                return (
                   
                    <ProductCard prod={data} key={index}/>
                 
                );
              })}
                 </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
