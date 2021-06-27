import {
  UserAddOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Alert } from "antd";
import { AppContext } from "../../Context/AppProvider";

export default function RoomInfo() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);

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
              <Button icon={<UsergroupAddOutlined />} type="text" block>
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
`;
