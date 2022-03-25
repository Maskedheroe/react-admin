import React, { useState } from "react";
import { deleteAction } from "../../../../services/section";
import "./style.css";
import { notification, Typography } from "antd";
import DeleteAction from "../../../../components/DeleteAction";

export const Action = ({
  id,
  reload,
  openNotification,
  edit,
  disabled,
}: {
  id: string;
  reload: () => void;
  openNotification: (text: string) => void;
  edit: (record: any) => void;
  disabled: boolean;
}) => {
  const [editingKey, setEditingKey] = useState<string>("");

  const cancel = () => {
    setEditingKey("");
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
      <Typography.Link
        disabled={editingKey !== ""}
        onClick={edit}
      >
        编辑
      </Typography.Link>
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
