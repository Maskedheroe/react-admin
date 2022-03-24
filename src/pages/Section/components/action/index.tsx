import React, { useState } from "react";
import { deleteAction } from "../../../../services/section";
import "./style.css";
import { notification } from "antd";
import DeleteAction from "../../../../components/DeleteAction";

export const Action = ({
  id,
  reload,
  openNotification,
}: {
  id: string;
  reload: () => void;
  openNotification: (text: string) => void;
}) => {
  const [editingKey, setEditingKey] = useState<string>("");

  const cancel = () => {
    setEditingKey("");
  };

  const handleEdit = () => {
    alert("edit");
  };
  const handleDelete = (sectionId: string) => {
    try {
      deleteAction(sectionId).then(() => {
        reload();
        openNotification("删除成功");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="action">
      <span className="edit" onClick={handleEdit}>
        编辑
      </span>
      <DeleteAction
        editingKey={editingKey}
        cancel={cancel}
        handleDelete={handleDelete}
        record={id}
        title={"确定删除该小节吗？"}
      />
    </div>
  );
};
