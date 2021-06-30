import React from "react";
import { Button, Avatar, Typography } from "antd";

import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";

import styled, { ThemeProvider } from "styled-components";
import { colorScheme } from "../../constants/theme";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.backgroundPrimary};
  margin: 20px 20px;
  border-radius: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  .avatar {
    border: 1px solid ${(props) => props.theme.border};
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  .username {
    color: ${(props) => props.theme.textPrimary};
    font-weight: bold;
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 10px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);

  return (
    <ThemeProvider theme={colorScheme.light}>
      <WrapperStyled>
        <Avatar src={photoURL} size="large" className="avatar">
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
        <Button
          danger
          ghost
          shape="round"
          size="small"
          onClick={() => {
            // clear state in App Provider when logout
            clearState();
            auth.signOut();
          }}
        >
          Đăng xuất
        </Button>
      </WrapperStyled>
    </ThemeProvider>
  );
}
