import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import Announcement from "../Announcement";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Success = () => {
  const location = useLocation();
  const data = location.state.res;
  const cart = location.state.products;

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  const currentUserId = currentUser.other._id;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUserId,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        console.log(res.data);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <>
      <Navbar />
      <Announcement />
      <div
        style={{
          height: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
        <Link to="/">
          <button style={{ padding: 10, marginTop: 20, cursor: "pointer" }}>
            Go to Homepage
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Success;
