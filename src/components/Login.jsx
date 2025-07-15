import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../config/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAdminLogin = location.pathname === "/admin/login";
  const isSellerLogin = location.pathname === "/seller/login";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const res = isAdminLogin
          ? await api.post("/admin/login", values)
          : isSellerLogin
          ? await api.post("/seller/login", values)
          : await api.post("/user/login", values);

        const token = res.data.token;

        const userData = {
          ...(isAdminLogin
            ? res.data.admin
            : isSellerLogin
            ? res.data.seller
            : res.data.user),
          role: isAdminLogin
            ? "admin"
            : isSellerLogin
            ? "seller"
            : "customer",
        };

        const userWithToken = { ...userData, token };
        dispatch(saveUser(userWithToken));
        localStorage.setItem("userInfo", JSON.stringify(userWithToken));

        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else if (userData.role === "seller") {
          navigate("/seller/dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
       // console.error("Login failed:", err.response?.data?.error || err.message);
        toast.error(err.response?.data?.error || "Login failed");
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-6 bg-base-100 text-base-content shadow-md rounded"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
  {isAdminLogin ? "Admin Login" : isSellerLogin ? "Seller Login" : "User Login"}
</h2>


      <label htmlFor="email" className="block mb-1">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className="w-full mb-4 p-2 border border-gray-300 rounded placeholder:text-base-content text-base-content"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
      )}

      <label htmlFor="password" className="block mb-1">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className="w-full mb-4 p-2 border border-gray-300 rounded placeholder:text-base-content text-base-content"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
      )}

      <button
        type="submit"
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
