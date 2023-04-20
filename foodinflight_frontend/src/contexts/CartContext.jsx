import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Context = createContext();

export const CartContext = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const onAddToCart = (item) => {
    setCartProducts(prev => [...prev, {
      ...item,
      quantity: 1,
      slug: item.slug
    }])

    toast.success(`${item.title} добавлено в корзину!`);
  };

  const onPlusToCart = (id) => {
    setCartProducts(prev => prev.map(item => {
      if (item.slug === id) {
        return ({...item, quantity: item.quantity + 1 })
      } 
      return item;
    }))
  };

  const onMinusFromCart = (id) => {
    let count = cartProducts.find((product) => product.slug === id).quantity;

    if (count === 1) {
      setCartProducts((prev) => prev.filter((item) => item.slug !== id));
    } else {
      setCartProducts((prev) => prev.map(item => {
        if (item.slug === id) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }))
    }
  }

  return (
    <Context.Provider
      value={{
        cartProducts, setCartProducts,
        onAddToCart, onPlusToCart, onMinusFromCart
      }}
    >
      {children}
    </Context.Provider>
  )
} 

export const useCartContext = () => useContext(Context);
