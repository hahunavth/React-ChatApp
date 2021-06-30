import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";
import { AuthContext } from "../../Context/AuthProvider";

const WrapperStyled = styled.div`
  margin-bottom: 30px;
  padding-left: 20px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 20px;
    background: #ffffff;
    color: #5f768c;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.19);
    max-width: 100px;
  }
`;

const CurrentUserWrapperStyled = styled.div`
  margin-bottom: 30px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: space-between;

  .messages-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    align-items: space-between;
  }

  .author {
    margin-right: 5px;
    font-weight: bold;
  }

  .date {
    margin-right: 10px;
    font-size: 11px;
    color: #a7a7a7;
    padding-top: 4px;
  }

  .content {
    float: right;
    margin-right: 20px;
    color: #a6aab2;
    background: #1a233b;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.19);
    max-width: 500px;
  }
`;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  uid,
  text,
  displayName,
  createdAt,
  photoURL,
}) {
  const { user } = React.useContext(AuthContext);

  // return (
  //   <WrapperStyled>
  //     <div>
  //       <Avatar size="small" src={photoURL}>
  //         {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
  //       </Avatar>
  //       <Typography.Text className="author">{displayName}</Typography.Text>
  //       <Typography.Text className="date">
  //         {formatDate(createdAt?.seconds)}
  //       </Typography.Text>
  //     </div>
  //     <div>
  //       <Typography.Text className="content">{text}</Typography.Text>
  //     </div>
  //   </WrapperStyled>
  // );

  return user.uid === uid ? (
    <CurrentUserWrapperStyled>
      <div>
        <div className="messages-container">
          <Typography.Text className="date">
            {formatDate(createdAt?.seconds)}
          </Typography.Text>
          <Typography.Text className="author">{displayName}</Typography.Text>
          <Avatar size="small" src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </div>
        <Typography.Text className="content">
          <span>{text}</span>
        </Typography.Text>
      </div>
    </CurrentUserWrapperStyled>
  ) : (
    <WrapperStyled>
      <div>
        <Avatar size="small" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}
