import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const SidebarStyled = styled.div`
  height: 100vh;
  background-color: #ffffff;
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  );
}
