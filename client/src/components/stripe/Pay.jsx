import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  width: 120px;
  border-radius: 5px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios({
          url: `${apiUrl}/checkout/payment`,
          method: "post",
          data: {
            amount: 23459,
            token: stripeToken.id,
          },
        });

        if (response?.status === 200) {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <Container>
      {stripeToken ? (
        <span>Processing... Please, wait.</span>
      ) : (
        <StripeCheckout
          name="NEXT-COM"
          billingAddress
          shippingAddress
          description="Your total is: $ 234.59"
          amount={23459}
          token={onToken}
          stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
        >
          <Button>Pay Now</Button>
        </StripeCheckout>
      )}
    </Container>
  );
};

export default Pay;
