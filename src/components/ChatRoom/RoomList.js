import React from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";
import styled, { ThemeProvider } from "styled-components";
import { colorScheme } from "../../constants/theme";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  padding: 0;
  margin: 0;
  &&& {
    .ant-collapse-header,
    p {
      color: black;
    }

    .ant-collapse-content-box {
      padding: 0 15px;
      margin: 0;
    }

    .add-room {
      color: black;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  background: ${(props) => props.theme.backgroundPrimary};
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const selectRoomStyled = (room, selectedRoomId) => {
    console.log(room.id);
    console.log(selectedRoomId);
    return room.id === selectedRoomId ? "#f3f6fb" : "#ffffff";
  };

  const title = "Danh sách các phòng " + rooms.length;

  return (
    <ThemeProvider theme={colorScheme.light}>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header={title} key="1">
          <div
            style={{
              padding: "0px",
            }}
          >
            {rooms.map((room) => (
              <LinkStyled
                style={{
                  padding: "10px",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  borderRadius: "10px",
                  background: selectRoomStyled(room, selectedRoomId),
                }}
                key={room.id}
                copyable={false}
                onClick={() => setSelectedRoomId(room.id)}
              >
                {room.name}
              </LinkStyled>
            ))}
            <Button
              type="text"
              block
              icon={<PlusSquareOutlined />}
              className="add-room"
              onClick={handleAddRoom}
            >
              Thêm phòng
            </Button>
          </div>
        </PanelStyled>
      </Collapse>
    </ThemeProvider>
  );
}
