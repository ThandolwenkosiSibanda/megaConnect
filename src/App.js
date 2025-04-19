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
import Profile from "./pages/profile";
import ProfileNew from "./pages/ProfileNew";
import AdminProfiles from "./pages/AdminProfiles";
import AdminProfile from "./pages/AdminProfile";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profiles/:id" element={<Profile />} />

          <Route path="/admin_new_profile" element={<ProfileNew />} />
          <Route path="/admin_profiles" element={<AdminProfiles />} />
          <Route path="/admin_profiles/:id" element={<AdminProfile />} />

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
