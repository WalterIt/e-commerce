import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Topbar from "../../../components/admin/topbar/Topbar";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Layout = () => {
  return (
    <>
      <Topbar />
      <Wrapper>
        <Sidebar />
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;
