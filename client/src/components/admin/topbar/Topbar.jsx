import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import styled from "styled-components";
import { logout } from "../../../redux/userSlice";

const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
`;

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser?.other);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin">
            <span className="logo">NEXT-COM</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>

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
        </div>
      </div>
    </div>
  );
}
