import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Cart from './component/Cart/Cart'
import Categories from './component/Categories/Categories'
import Brands from './component/Brands/Brands'
import Notfound from './component/Notfound/Notfound'
import Login from './component/Login/Login'
import Signup from './component/Signup/Signup'
import Product from './component/Product/Product'
import Updatepassword from './component/Updatepassword/Updatepassword'
import ForgetPassword from './component/Forgetpassword/Forgetpassword'
import Productdetails from './component/Productdetails/Productdetails'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthContextProvider, { AuthContext } from './Context/AuthContextProvider'
import CartContextProvider from './Context/CartContextProvider'

import ProtectedRouting from './component/ProtectedRouting/ProtectedRouting'
import Wishlist from './component/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContextProvider'
import Shippingdetails from './component/Shippingdetails/Shippingdetails'
import Allorders from './component/Allorders/Allorders'
import Orderdetails from './component/Orderdetails/Orderdetails'

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting> <Cart /></ProtectedRouting> },
        { path: "shippingdetails/:cartid", element: <ProtectedRouting> <Shippingdetails /></ProtectedRouting> },
        { path: "wishlist", element: <ProtectedRouting> <Wishlist /></ProtectedRouting> },
        { path: "product", element: <ProtectedRouting> <Product /></ProtectedRouting> },
        { path: "categories", element: <ProtectedRouting><Categories /></ProtectedRouting> },
        { path: "brands", element: <ProtectedRouting><Brands /></ProtectedRouting> },
        { path: "productdetails/:id", element: <ProtectedRouting><Productdetails /></ProtectedRouting> },
        { path: "allorders", element: <ProtectedRouting><Allorders /></ProtectedRouting> },
        { path: "orderdetails/:idorder", element: <ProtectedRouting><Orderdetails /></ProtectedRouting> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "updatepassword", element: <Updatepassword /> },
        { path: "*", element: <Notfound /> }


      ]
    }
  ]);
  let client = new QueryClient();
  // 
  return (
    <div>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <WishlistContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes}></RouterProvider>
            </CartContextProvider>
          </WishlistContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}
