import { /*UserAddOutlined,*/ SendOutlined } from "@ant-design/icons";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

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

export default function ChatWindow() {
  const { selectedRoom } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);

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

  return (
    <FormStyled form={form}>
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
    </FormStyled>
  );
}
