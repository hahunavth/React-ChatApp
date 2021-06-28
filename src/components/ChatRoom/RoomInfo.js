import {
  UserAddOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import styled from "styled-components";
import { deleteDocument, deleteDocumentWhere } from "../../firebase/services";
import { Button, Tooltip, Avatar, Form, Alert } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { useFirestore } from "../../hooks/useFirestore";

export default function RoomInfo() {
  const {
    selectedRoom,
    members,
    setIsInviteMemberVisible,
    setIsMemberListVisible,
  } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  console.log(selectedRoom.id);

  const handleDeleteRoom = () => {
    const condition = {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };

    deleteDocument("rooms", selectedRoom.id);
    deleteDocumentWhere("messages", condition);
  };

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <Avatar.Group size="large" maxCount={2} className="avatar">
              {members.map((member) => (
                <Tooltip title={member.displayName} key={member.id}>
                  <Avatar src={member.photoURL}>
                    {member.photoURL
                      ? ""
                      : member.displayName?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>

            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
                block
              >
                Mời
              </Button>
            </ButtonGroupStyled>
            <ButtonGroupStyled>
              <Button
                icon={<UsergroupAddOutlined />}
                onClick={() => {
                  setIsMemberListVisible(true);
                }}
                type="text"
                block
              >
                Thanh vien trong nhom
              </Button>
            </ButtonGroupStyled>
            <ButtonGroupStyled>
              <Button icon={<FileImageOutlined />} type="text" block>
                Thay doi anh nhom
              </Button>
            </ButtonGroupStyled>
            <ButtonGroupStyled>
              <Button icon={<LogoutOutlined />} type="text" block>
                Roi nhom
              </Button>
            </ButtonGroupStyled>
            {members.slice(-1)[0]?.uid === user.uid ? (
              <ButtonGroupStyled>
                <Button
                  onClick={handleDeleteRoom}
                  icon={<LogoutOutlined />}
                  type="text"
                  block
                >
                  Xoa nhom
                </Button>
              </ButtonGroupStyled>
            ) : null}
          </HeaderStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}

const HeaderStyled = styled.div`
  text-align: center;

  .avatar {
    margin-top: 15%;
  }
  .header__info {
    margin-bottom: 30px;
  }
  .header__title {
    font-size: 24px;
    font-weight: 600;
  }
  .header__description {
    font-size: 18px;
    font-weight: 500;
    word-wrap: break-word;
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
`;