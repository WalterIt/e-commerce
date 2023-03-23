import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", marginBottom: "15px" })}
  border-bottom: 1px solid #dcdada;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Hr = styled.hr`
  background-color: #dcdada;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === "total" ? "500" : "300")};
  font-size: ${(props) => (props.type === "total" ? "24px" : "18px")};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };
  // console.log(stripeToken);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await userRequest.post(`/checkout/payment`, {
          amount: cart.total * 100,
          token: stripeToken.id,
        });

        if (response?.status === 200) {
          // console.log(response?.data);
          navigate("/success", {
            state: { res: response.data ?? {}, products: cart },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
          <Info>
            {cart.products.map((product, i) => (
              <Product key={i}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <RemoveIcon />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <AddIcon />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="NEXT-COM"
              billingAddress
              shippingAddress
              description={`Your total is: $ ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
