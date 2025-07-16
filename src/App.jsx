import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BecomeSeller from "./components/Becomeseller";
import Products from "./pages/Products";
import ProductDetails from "./pages/user/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import ProtectedRoute from "./layouts/ProtectedRoute";
import About from "./components/About";

//  User Dashboard and Pages
import UserDashboard from "./pages/user/UserDashboard";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import MyOrders from "./pages/user/MyOrders";
import Review from "./pages/user/Review";

//  Admin
import AdminProtectedRoute from "./layouts/AdminProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import SellerProtectedRoute from "./layouts/SellerProtecterRoute";
import SellerDashboard from "./pages/user/Seller/SellerDashboard";
import SellerProfile from "./pages/user/Seller/SellerProfile";
import CreateProduct from "./pages/user/Seller/CreateProduct";
import SellerOrders from "./pages/user/Seller/SellerOrder";
import MyProducts from "./pages/user/Seller/MyProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import NotFound from "./components/NotFound";
const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/seller/become" element={<BecomeSeller />} />
        <Route path="footer" element={<Footer />} />
        <Route path="/about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/category/:category" element={<CategoryProducts />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="review" element={<Review />} />
      </Route>



      {/*  Admin routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin-dashboard/"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        <Route path="products" element={<ManageProducts />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>


      <Route path="/seller/login" element={<Login />} />
      <Route path="/seller/signup" element={<Signup isSellerDefault={true} />} />
      <Route
        path="/seller/dashboard"
        element={
          <SellerProtectedRoute>
            <SellerDashboard />
          </SellerProtectedRoute>
        }
      >
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<SellerProfile />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="/seller/dashboard/products" element={<MyProducts />} />
        <Route path="/seller/dashboard/orders" element={<SellerOrders />} />

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;