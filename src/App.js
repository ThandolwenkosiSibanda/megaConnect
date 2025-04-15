import React, { useContext } from "react";
import "./index.css";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";
import OrderThanks from "./pages/OrderThanks";
import { UserContext } from "./context/user";
import ProductNew from "./pages/ProductNew";
import NewProducts from "./pages/NewProducts";
import ProductPromotions from "./pages/ProductPromotions";
import ScrollToTop from "./components/scroll/ScrollToTop";
import BestSellers from "./pages/BestSellers";
import QueryNew from "./pages/QueryNew";
import Queries from "./pages/Queries";
import AdminProducts from "./pages/AdminProducts";
import AdminProduct from "./pages/AdminProduct";
import AdminCategories from "./pages/AdminCategories";
import AdminCategory from "./pages/AdminCategory";
import AdminCategoryNew from "./pages/AdminCategoryNew";
import AdminOrders from "./pages/AdminOrders";
import AdminOrder from "./pages/AdminOrder";
import AdminBanners from "./pages/AdminBanners";
import AdminBanner from "./pages/AdminBanner";
import AdminBannerNew from "./pages/AdminBannerNew";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/brand_new" element={<NewProducts />} />
          <Route path="/promotions" element={<ProductPromotions />} />
          <Route path="/best_sellers" element={<BestSellers />} />

          <Route path="/category/:id" element={<Shop />} />
          <Route path="/ordersucess" element={<OrderThanks />} />
          <Route path="/newproduct" element={<ProductNew />} />
          <Route path="/admin_products" element={<AdminProducts />} />
          <Route path="/admin_products/:id" element={<AdminProduct />} />
          <Route path="/admin_categories" element={<AdminCategories />} />
          <Route path="/admin_categories/:id" element={<AdminCategory />} />
          <Route path="/admin_newcategory" element={<AdminCategoryNew />} />
          <Route path="/admin_orders" element={<AdminOrders />} />
          <Route path="/admin_orders/:id" element={<AdminOrder />} />
          <Route path="/admin_banners" element={<AdminBanners />} />
          <Route path="/admin_banners/:id" element={<AdminBanner />} />
          <Route path="/admin_new_banner" element={<AdminBannerNew />} />

          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/orders" element={<Navigate to="/login" />} />
              <Route path="/newquery" element={<Navigate to="/login" />} />
              <Route path="/queries" element={<Navigate to="/login" />} />
              <Route path="/cart" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/forgotpassword" element={<Navigate to="/" />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/queries" element={<Queries />} />
              <Route path="/newquery" element={<QueryNew />} />
              <Route path="/cart" element={<Cart />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
