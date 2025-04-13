import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectcarts, deleteItemAsync, updateItemsAsync,  } from "./cartSlice";
import "./Cart.css";

export function Cart() {
  const items = useSelector(selectcarts);
  const dispatch = useDispatch();
  const handleChange = (e,id)=>{
    console.log(e.target.value);
    dispatch(updateItemsAsync({id,updateItem:{quantity:+e.target.value}}));
  }
  return (
    <div>
      <div className="container">
        {items.map((item)=>(
          <div className="cart-item">
            <img className="img-fluid" src={item.thumbnail} alt=""></img>
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              <select value={item.quantity} onChange={(e)=>handleChange(e,item.id)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={()=>dispatch(deleteItemAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
      </div>
      <h1>Total : {items.reduce((acc,item)=>item.price*item.quantity+acc,0)}</h1>
    </div>
  );
}
