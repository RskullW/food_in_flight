import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const Context = createContext();

export const CartContext = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    return (savedCartProducts !== null ? savedCartProducts : []);
  });

  const [loggedIn, setLoggedIn] = useState(false); 
  const [EnterAlertDialogOpen, setEnterAlertDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const checkLoggedIn = () => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split('=');
      if (name === 'access_token') {
        setLoggedIn(true);
        return value;
      } else {
        setEnterAlertDialogOpen(true);
      }
    }
    setLoggedIn(false);
    return null;
  }

  const checkProductInCart = (item) => {
    const foundProduct = cartProducts.find(product => product.slug === item.slug);
    return foundProduct ? foundProduct : null;
  }

  const onAddToCart = (item) => {
    setCartProducts(prev => [...prev, {
      ...item,
      quantity: 1,
      slug: item.slug,
    }]);

    toast.success(`${item.title} добавлено в корзину!`);
  };

  const onPlusToCart = (id) => {
    setCartProducts(prev => prev.map(item => {
      if (item.slug === id) {
        return ({ ...item, quantity: item.quantity + 1 })
      }
      return item;
    }))
  };

  const countTotalPrice = () => {
    let totalPrice = 200;
    for (let p of cartProducts) {
      totalPrice += p.quantity * p.price;
    }
    return totalPrice ? totalPrice : null;
  }

  const onMinusFromCart = (id) => {
    let count = cartProducts.find((product) => product.slug === id).quantity;

    if (count === 1) {
      setCartProducts((prev) => prev.filter((item) => item.slug !== id));
    } else {
      setCartProducts((prev) => prev.map(item => {
        if (item.slug === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }))
    }
  }

  const removeFromCart = (id) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.slug !== id)
    );
    localStorage.setItem(
      "cartProducts",
      JSON.stringify(cartProducts.filter((product) => product.slug !== id))
    );
  }

  const clearCart = () => {
    setCartProducts([]);
    localStorage.setItem("cartProducts", []);
  }

  return (
    <Context.Provider
      value={{
        cartProducts, setCartProducts,
        onAddToCart, onPlusToCart, onMinusFromCart, removeFromCart, checkProductInCart, countTotalPrice, clearCart,
        checkLoggedIn, loggedIn, EnterAlertDialogOpen, setEnterAlertDialogOpen
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCartContext = () => useContext(Context);
