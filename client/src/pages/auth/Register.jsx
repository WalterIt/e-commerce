import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../redux/apiCalls";
import { mobile } from "../../responsive";

const initialState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirm: "",
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: #fff;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 5px auto;
  font-weight: 600;
  letter-spacing: 2px;
`;

const Alert = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin: 5px 0px;
  color: red;
`;

const Register = () => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  function validarEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;

    if (emailRegex.test(email)) {
      return true;
    }

    return false;
  }
  const emailValid = validarEmail(inputs.email);

  const handleClick = (e) => {
    e.preventDefault();
    try {
      const emailValid = validarEmail(inputs.email);
      if (emailValid && passwordConfirm === inputs?.password) {
        const res = register(inputs);
        navigate("/login");
      } else {
        console.log("Email invalid! Please, enter a valid Email.");
      }
    } catch (error) {
      // console.log(error);
      console.log("Erro ao registrar", error);
    }
    setInputs(initialState);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            placeholder="User Name"
            name="username"
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          {emailValid && !emailValid && (
            <Alert>Please, enter a valid email!</Alert>
          )}
          {inputs?.password &&
            passwordConfirm &&
            passwordConfirm !== inputs?.password && (
              <Alert>The passwords don't match!</Alert>
            )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
