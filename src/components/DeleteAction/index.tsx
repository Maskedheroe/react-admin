import React from "react";
import { Popconfirm, Typography } from "antd";

interface Props<T> {
  cancel: () => void;
  handleDelete: (record: T ) => void;
  record: T;
  editingKey: string;
  title: string;
} 

export default function DeleteAction<T>({ cancel, handleDelete, record, editingKey, title } : Props<T>){
  return (
    <>
      <Popconfirm
        title={title}
        onConfirm={() => handleDelete(record)}
        onCancel={cancel}
        okText="确认"
        cancelText="取消"
      >
        <Typography.Link
          style={{ marginLeft: "10px" }}
          disabled={editingKey !== ""}
        >
          删除
        </Typography.Link>
      </Popconfirm>
    </>
  )
}
