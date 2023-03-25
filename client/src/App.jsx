import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pay from "./components/stripe/Pay";
import Success from "./components/stripe/Success";
import HomeAdmin from "./pages/admin/home/HomeAdmin";
import Layout from "./pages/admin/layout/Layout";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import NewUser from "./pages/admin/newUser/NewUser";
import ProductAdmin from "./pages/admin/product/ProductAdmin";
import ProductListAdmin from "./pages/admin/productList/ProductListAdmin";
import User from "./pages/admin/user/User";
import UserList from "./pages/admin/userList/UserList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";

export const apiUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route element={<Layout />}>
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user/:userId" element={<User />} />
          <Route path="/admin/newUser" element={<NewUser />} />
          <Route path="/admin/products" element={<ProductListAdmin />} />
          <Route path="/admin/product/:productId" element={<ProductAdmin />} />
          <Route path="/admin/newproduct" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
