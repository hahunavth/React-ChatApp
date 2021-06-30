import React, { useContext } from "react";
import { Modal, Button, Avatar } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";

export default function MemberListModal() {
  const { members, isMemberListVisible, setIsMemberListVisible } =
    useContext(AppContext);
  const { user } = useContext(AuthContext);

  // console.log(members);

  const handleOk = () => {
    setIsMemberListVisible(false);
  };

  const handleCancel = () => {
    setIsMemberListVisible(false);
  };

  const handleDeleteUser = (id) => {
    // console.log(id);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isMemberListVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {members.map((member) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
              key={member.uid}
              value={member.uid}
              title={member.displayName}
            >
              <div>
                <Avatar size="small" src={member.photoURL}>
                  {member.photoURL
                    ? ""
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                {` ${member.displayName}`}
              </div>
              {user.uid !== member.uid ? (
                <Button onClick={handleDeleteUser.bind(this, member.uid)}>
                  Delete
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
