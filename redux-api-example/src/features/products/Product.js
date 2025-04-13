import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, fetchProductAsync } from "./productSlice";
import { addItemAsync } from "../cart/cartSlice";
import "./Product.css";

export function Product() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAsync());
  }, [dispatch]);
  return (
    <div>
      <div className="container">
        {products.map((product) => (
          <div className="card">
            <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={()=>dispatch(addItemAsync(product))}>Add to Cart</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
