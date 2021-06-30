import { /*UserAddOutlined,*/ SendOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import { Spin } from "antd";
import { LoadingOutlined, MessageOutlined } from "@ant-design/icons";
import ChatInput from "./ChatInput";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 57px;
  padding: 0 16px;
  align-items: center;

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 96vh;
  margin-top: 2vh;
`;

const ContentStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 11px;
  background: #f3f6fb;
  border-radius: 25px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid #cccccc;
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const [isLoading, setIsLoading] = useState(false);

  const { selectedRoom, members /*, setIsInviteMemberVisible */ } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const el = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if (inputValue) {
      addDocument("messages", {
        text: inputValue,
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
      });

      form.resetFields(["message"]);
      setInputValue("");
    }

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);

  useEffect(() => {
    setIsLoading(true);
  }, [selectedRoom.id]);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
      // messageListRef.current.scrollIntoView({
      //   block: "end",
      //   behavior: "smooth",
      // });
    }
    setIsLoading(false);
  }, [messages]);

  useEffect(() => {
    if (el?.current) el.current.scrollIntoView({ block: "end" });
  });

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          {/* <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled> */}
          {/* <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button> */}
          {/* <Avatar.Group size="small" maxCount={2}>
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
            </ButtonGroupStyled>
          </HeaderStyled> */}
          {isLoading ? (
            <Spin
              size="large"
              tip="Loading..."
              style={{ position: "fixed", bottom: "50%", left: "50%" }}
              indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            />
          ) : (
            <ContentStyled>
              <MessageListStyled ref={messageListRef}>
                {messages.length ? (
                  messages.map((mes) => (
                    <Message
                      key={mes.id}
                      uid={mes.uid}
                      text={mes.text}
                      photoURL={mes.photoURL}
                      displayName={mes.displayName}
                      createdAt={mes.createdAt}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: `translate(-50%, 50%)`,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <MessageOutlined
                      style={{
                        fontSize: "90px",
                        color: "#cccccc",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "28px",
                        color: "#99999999",
                        fontWeight: "500",
                      }}
                    >
                      Chat now!
                    </span>
                  </div>
                )}
                <div ref={el} id={"el"}></div>
              </MessageListStyled>
              {/* <FormStyled form={form}>
                <Form.Item name="message">
                  <Input
                    ref={inputRef}
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                    placeholder="Nhập tin nhắn..."
                    bordered={false}
                    autoComplete="off"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  shape="circle"
                  onClick={handleOnSubmit}
                ></Button>
              </FormStyled> */}
              <ChatInput />
            </ContentStyled>
          )}
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
