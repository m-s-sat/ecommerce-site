import React, { useEffect, useState } from 'react';
import { Product } from './features/products/Product';
import { Cart } from './features/cart/Cart';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsAsync, selectcarts } from './features/cart/cartSlice';

function App() {
  const [showCart,setShowCart] = useState(false);
  const items = useSelector(selectcarts);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchItemsAsync());
  },[])
  return (
    <div className="App">
      <button onClick={()=>setShowCart(!showCart)}>Cart [{items.length}]</button>
      {showCart?<Cart></Cart>:<Product></Product>}
    </div>
  );
}

export default App;
