import React from 'react';
import { CookiesProvider } from "react-cookie";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import UserAgreementPage from './pages/UserAgreementPage';
import ProductPage from './pages/ProductPage';
import ContactsPage from './pages/ContactsPage';
import ShippingPage from './pages/ShippingPage';
import FeedbackPage from './pages/FeedBackPage';
import TrademarksPage from './pages/TrademarksPage';
import GroupCategoryPage from './pages/GroupCategoryPage';
import CuisinesPage from './pages/CuisinesPage';
import ResultsOfSearchPage from './pages/ResultsOfSearchPage';
import OrdersHistoryPage from './pages/OrdersHistoryPage';
import AboutPaymentPage from './pages/AboutPaymentPage';
import { CartContext } from './contexts/CartContext';
import AboutKitchenPage from './pages/AboutKitchenPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },

  {
    path: '/about',
    element: <AboutPage />,
  },

  {
    path: '/:category/:productName',
    element: <ProductPage />,
  },

  {
    path: '/categories/:categoryName',
    element: <CategoryPage/>,
  },

  {
    path: '/searchResults/:queryName',
    element: <ResultsOfSearchPage />,
  },

  {
    path: '/group_categories/:groupCategoryName',
    element: <GroupCategoryPage />
  },

  {
    path: '/cuisines/:cuisineName',
    element: <CuisinesPage />
  },

  {
    path: '/ordersHistory',
    element: <OrdersHistoryPage />
  },

  {
    path: '/user-agreement',
    element: <UserAgreementPage/>
  },

  {
    path: '/contacts',
    element: <ContactsPage /> ,
  },

  {
    path: '/shipping',
    element: <ShippingPage />,
  },

  {
    path: '/feedback',
    element: <FeedbackPage />,
  },

  {
    path: '/trademarks',
    element: <TrademarksPage />
  },

  {
    path: '/aboutPayment',
    element: <AboutPaymentPage />
  },

  {
    path: '/aboutKitchen',
    element: <AboutKitchenPage />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <CartContext>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </CartContext>
  </ChakraProvider>
);

