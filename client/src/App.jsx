import axios from "axios";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Pay from "./pages/stripe/Pay";

export const apiUrl = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

function App() {
  return <Pay />;
}

export default App;
