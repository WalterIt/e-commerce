import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "65px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`;

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser?.other);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search..." />
            <SearchOutlinedIcon style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>NEXT-COM</Logo>
          </Link>
        </Center>
        <Right>
          {!user ? (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem1>REGISTER</MenuItem1>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem1>LOGIN</MenuItem1>
              </Link>
            </>
          ) : (
            <FormControl
              variant="standard"
              value={user.username}
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
                padding: "1px",
                // gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width="35px"
                height="35px"
                display="flex"
                position="absolute"
                src={
                  user?.img ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={user.username}
              />
              <Select
                // value={user.username}
                sx={{
                  //   backgroundColor: "rgba(0, 128, 128, 0.522)",
                  width: "20px",
                  //   borderRadius: "0.25rem",
                  //   p: "0.25rem 1rem",
                  //   "& .MuiSvgIcon-root": {
                  //     pr: "0.25rem",
                  //     width: "3rem",
                  //   },
                  //   "& .MuiSelect-select:focus": {
                  //     backgroundColor: "rgba(0, 128, 128, 0.522)",
                  //   },
                }}
                input={<InputBase />}
              >
                <MenuItem value={user.username}>
                  <Typography>{user.username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem1>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem1>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
