import { Button, Chip } from "@mui/material";
import { useState } from "react";

const SortingProducts = ({ products, setProducts }) => {
  const [activeButton, setActiveButton] = useState(false);
  return (
    <>
      <div style={{}}>
        <Chip
          variant="contained"
          label={"SORT BY PRICE:"}
          sx={{ backgroundColor: "#1976d2", color: "white", margin: "2px" }}
        ></Chip>
        <Button
          onClick={() => {
            let newArray = products?.sort((a, b) => {
              return a.price - b.price;
            });
            setProducts([...newArray]);
            setActiveButton("ascend");
          }}
          variant="contained"
          sx={{
            backgroundColor: activeButton === "ascend" ? "gray" : "black",
            color: "white",
            margin: "2px",
          }}
          size="small"
        >
          Low to High
        </Button>
        <Button
          size="small"
          onClick={() => {
            let newArray = products?.sort((a, b) => {
              return b.price - a.price;
            });
            setProducts([...newArray]);
            setActiveButton("descend");
          }}
          variant="contained"
          sx={{
            backgroundColor: activeButton === "descend" ? "gray" : "black",
            color: "white",
            margin: "2px",
          }}
        >
          HIGH TO LOW
        </Button>
      </div>
    </>
  );
};

export default SortingProducts;
