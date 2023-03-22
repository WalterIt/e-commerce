import Pay from "./components/stripe/Pay";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";

export const apiUrl = import.meta.env.VITE_BASE_URL;

function App() {
  return <Pay />;
}

export default App;
