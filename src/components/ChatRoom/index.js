import React from "react";
import { Row, Col } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import RoomInfo from "./RoomInfo";

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={12}>
          <ChatWindow />
        </Col>
        <Col span={6}>
          <RoomInfo />
        </Col>
      </Row>
    </div>
  );
}
