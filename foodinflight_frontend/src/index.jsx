import React from 'react';
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
    path: '/:category/:product',
    element: <ProductPage />,
  },

  {
    path: '/categories/:categoryName',
    element: <CategoryPage/>,
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
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);

